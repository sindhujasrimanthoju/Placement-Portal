@echo off
setlocal

if not defined JAVA_HOME (
    echo JAVA_HOME is not set.
    echo Please set JAVA_HOME to your installed JDK path before running this script.
    exit /b 1
)

set "PATH=%JAVA_HOME%\bin;%PATH%"

echo ============================================
echo Starting College Placement Portal Backend
echo ============================================
echo.
echo Java Home: %JAVA_HOME%
echo.
echo Building and starting application...
echo This may take 2-3 minutes on first run...
echo.

call mvnw.cmd spring-boot:run

endlocal
pause
