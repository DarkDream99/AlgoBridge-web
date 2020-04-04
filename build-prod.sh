echo 1: Building app ===========================================================
npm run build
echo 2: Adding routers =========================================================
echo '/*    /index.html  200' > ./build/_redirects
echo 3: Deploing to netlify ====================================================
netlify deploy --dir=build --prod
echo ===========================================================================
