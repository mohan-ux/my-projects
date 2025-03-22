import subprocess
import tempfile
import os
import re  # Import the re module for regular expressions

class JavaCompiler:
    def run(self, code, input_data=None):
        try:
            # Extract class name from Java code
            class_name_match = re.search(r'\bclass\s+([A-Za-z_$][A-Za-z\d_$]*)', code)
            if not class_name_match:
                return "Error: No class definition found in Java code."
            
            class_name = class_name_match.group(1)
            java_file = f"{class_name}.java"
            class_file = class_name

            # Create a temporary directory for Java files
            with tempfile.TemporaryDirectory() as temp_dir:
                java_file_path = os.path.join(temp_dir, java_file)
                
                # Write code to Java file
                with open(java_file_path, 'w') as f:
                    f.write(code)
                
                # Compile the Java code
                compile_cmd = ['javac', java_file_path]
                compile_result = subprocess.run(compile_cmd, capture_output=True, text=True)
                
                if compile_result.returncode != 0:
                    return f"Compilation Error:\n{compile_result.stderr}"
                
                # Run the Java program
                run_cmd = ['java', '-cp', temp_dir, class_file]
                if input_data:
                    run_result = subprocess.run(
                        run_cmd,
                        input=input_data,
                        capture_output=True,
                        text=True
                    )
                else:
                    run_result = subprocess.run(run_cmd, capture_output=True, text=True)
                
                if run_result.returncode == 0:
                    return f"Output:\n{run_result.stdout}"
                else:
                    return f"Runtime Error:\n{run_result.stderr}"
        
        except Exception as e:
            return f"Error: {str(e)}"