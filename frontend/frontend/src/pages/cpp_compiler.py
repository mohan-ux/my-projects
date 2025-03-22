import subprocess
import tempfile
import os

class CPPCompiler:
    def run(self, code, input_data=None):
        try:
            # Create a temporary directory for C++ files
            with tempfile.TemporaryDirectory() as temp_dir:
                cpp_file = os.path.join(temp_dir, 'temp.cpp')
                exe_file = os.path.join(temp_dir, 'temp.out')
                
                # Write code to C++ file
                with open(cpp_file, 'w') as f:
                    f.write(code)
                
                # Compile the C++ code
                compile_cmd = ['g++', cpp_file, '-o', exe_file]
                compile_result = subprocess.run(compile_cmd, capture_output=True, text=True)
                
                if compile_result.returncode != 0:
                    return f"Compilation Error:\n{compile_result.stderr}"
                
                # Run the compiled C++ program
                run_cmd = [exe_file]
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