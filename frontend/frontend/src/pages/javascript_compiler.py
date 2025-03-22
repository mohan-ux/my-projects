import subprocess

class JavaScriptCompiler:
    def run(self, code):
        try:
            # Save the code to a temporary file
            with open('temp.js', 'w') as f:
                f.write(code)
            
            # Run the code using Node.js
            result = subprocess.run(['node', 'temp.js'], capture_output=True, text=True)
            
            if result.returncode == 0:
                return result.stdout
            else:
                return result.stderr
        except Exception as e:
            return f"Error: {str(e)}"
