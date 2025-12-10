@echo off
REM -- Git 자동 푸시 스크립트 (main 브랜치 기준) --

echo Starting Git automatic push...

REM -- 1. 모든 변경사항 Staging Area에 추가
git add .

REM -- 2. 변경사항 커밋 (고정 메시지 사용)
REM 날짜/시간 자동 생성 코드를 제거하고 고정된 메시지를 사용합니다.
git commit -m "Auto commit via script"

REM -- 3. 원격 저장소로 푸시
git push origin main
REM git push origin main --force 

echo.
echo Git push completed successfully!
pause