import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//https://vitejs.dev/config/

export default defineConfig({
  base: '/depploying-vite-project-example/',
  plugins: [vue()]
})
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
};
