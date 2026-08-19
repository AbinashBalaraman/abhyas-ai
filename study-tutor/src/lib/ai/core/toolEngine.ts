import { z, ZodIssue } from 'zod';

export interface AgentTool<TParams extends z.ZodObject<any>> {
  name: string;
  description: string;
  parameters: TParams;
  execute: (args: z.infer<TParams>) => Promise<any>;
}

export function defineTool<TParams extends z.ZodObject<any>>(
  tool: AgentTool<TParams>
): AgentTool<TParams> {
  return tool;
}

export interface ToolCallInvocation {
  id: string;
  name: string;
  rawArguments: string | Record<string, any>;
}

export interface ToolExecutionResult {
  toolCallId: string;
  toolName: string;
  success: boolean;
  result?: any;
  error?: {
    type: 'SYNTAX_ERROR' | 'VALIDATION_ERROR' | 'EXECUTION_ERROR';
    message: string;
    details?: any;
    repairPrompt: string;
  };
}

export class ToolExecutionEngine {
  private tools = new Map<string, AgentTool<any>>();

  constructor(tools: AgentTool<any>[] = []) {
    tools.forEach((t) => this.tools.set(t.name, t));
  }

  registerTool(tool: AgentTool<any>) {
    this.tools.set(tool.name, tool);
  }

  getTool(name: string): AgentTool<any> | undefined {
    return this.tools.get(name);
  }

  async execute(call: ToolCallInvocation): Promise<ToolExecutionResult> {
    const tool = this.tools.get(call.name);

    if (!tool) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        success: false,
        error: {
          type: 'EXECUTION_ERROR',
          message: `Tool '${call.name}' does not exist.`,
          repairPrompt: `Available tools are: ${Array.from(this.tools.keys()).join(', ')}. Please call a valid tool.`,
        },
      };
    }

    let parsedArgs: any;
    if (typeof call.rawArguments === 'string') {
      try {
        parsedArgs = JSON.parse(call.rawArguments);
      } catch (err: any) {
        return {
          toolCallId: call.id,
          toolName: call.name,
          success: false,
          error: {
            type: 'SYNTAX_ERROR',
            message: `Invalid JSON payload: ${err.message}`,
            repairPrompt: `Your tool call arguments failed JSON parsing. Raw input: "${call.rawArguments}"`,
          },
        };
      }
    } else {
      parsedArgs = call.rawArguments;
    }

    const validation = tool.parameters.safeParse(parsedArgs);
    if (!validation.success) {
      const issueDetails = validation.error.issues
        .map((i: ZodIssue) => `• Field '${i.path.join('.')}': ${i.message}`)
        .join('\n');

      return {
        toolCallId: call.id,
        toolName: call.name,
        success: false,
        error: {
          type: 'VALIDATION_ERROR',
          message: `Argument schema validation failed for '${call.name}'.`,
          details: validation.error.format(),
          repairPrompt: `Tool validation error for '${call.name}':\n${issueDetails}\nPlease fix the parameters and retry.`,
        },
      };
    }

    try {
      const output = await tool.execute(validation.data);
      return {
        toolCallId: call.id,
        toolName: call.name,
        success: true,
        result: output,
      };
    } catch (err: any) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        success: false,
        error: {
          type: 'EXECUTION_ERROR',
          message: err.message || 'Runtime error during tool execution.',
          repairPrompt: `Runtime failure during '${call.name}' execution: ${err.message}`,
        },
      };
    }
  }
}
