import sys
import os

# Import database functions directly from main
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from main import save_chat_message, get_chat_history

def test_database_utf8_encoding():
    print("Running database UTF-8 encoding verification test...")
    unicode_test_text = "Tutor Answer containing calendar 📅 and arrow → symbols."
    
    # Save to database
    save_chat_message("system", unicode_test_text)
    
    # Retrieve chat history
    history = get_chat_history()
    
    # Verify that our saved message exists in the retrieved history
    saved_successfully = False
    for msg in history:
        # msg is usually a tuple or dict, let's check both
        if hasattr(msg, "get"):
            content = msg.get("text", "")
        else:
            # tuple index
            content = msg[2] if len(msg) > 2 else ""
            
        if unicode_test_text in content:
            saved_successfully = True
            break
            
    if not saved_successfully:
        print("Failure: unicode message was NOT found in database history!")
        assert False, "Unicode message failed to save to database chat history."
        
    print("Success: unicode message successfully verified in database history.")

if __name__ == "__main__":
    test_database_utf8_encoding()
