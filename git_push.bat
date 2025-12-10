@echo off
REM -- Git 자동 푸시 스크립트 (main 브랜치 기준) --

echo Starting Git automatic push...

REM -- 1. 모든 변경사항 Staging Area에 추가
git add .

REM -- 2. 변경사항 커밋 (날짜와 시간으로 자동 메시지 생성)
FOR /F "tokens=2 delims==" %%I IN ('WMIC OS GET LocalDateTime /F') DO SET "dt=%%I"
SET "YYYY=%dt:~0,4%"
SET "MM=%dt:~4,2%"
SET "DD=%dt:~6,2%"
SET "HH=%dt:~8,2%"
SET "Min=%dt:~10,2%"
SET "Sec=%dt:~12,2%"
SET "CommitMsg=Auto commit on %YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "%CommitMsg%"

REM -- 3. 원격 저장소로 푸시 (강제 푸시 사용 시 아래 주석 해제)
git push origin main
REM git push origin main --force 

echo.
echo Git push completed successfully!
pause