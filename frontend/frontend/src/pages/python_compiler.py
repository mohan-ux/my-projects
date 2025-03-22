import sys
from io import StringIO
import contextlib

class PythonCompiler:
    def run(self, code):
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        redirected_output = sys.stdout = StringIO()
        redirected_error = sys.stderr = StringIO()
        
        try:
            with contextlib.redirect_stdout(redirected_output):
                with contextlib.redirect_stderr(redirected_error):
                    exec(code, {'__builtins__': __builtins__,
                                'np': self.safe_import('numpy'),
                                'pd': self.safe_import('pandas'),
                                'plt': self.safe_import('matplotlib.pyplot'),
                                'sklearn': self.safe_import('sklearn'),
                                'tf': self.safe_import('tensorflow')})
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            return redirected_output.getvalue() + redirected_error.getvalue()
        except Exception as e:
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            return f"Error: {str(e)}\n{redirected_error.getvalue()}"

    def safe_import(self, module_name):
        try:
            return __import__(module_name)
        except ImportError:
            return None
