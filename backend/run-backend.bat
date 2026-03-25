@echo off
setlocal

set "JAVA_HOME=C:\Program Files\Java\jdk-25"
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
