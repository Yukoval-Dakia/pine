#!/bin/bash

# 创建图片目录
mkdir -p public/images

# 下载科学家图片
curl -o public/images/einstein.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg"
curl -o public/images/newton.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GodfreyKneller-IsaacNewton-1689.jpg/440px-GodfreyKneller-IsaacNewton-1689.jpg"
curl -o public/images/curie.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/440px-Marie_Curie_c1920.jpg"
curl -o public/images/darwin.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Charles_Darwin_seated.jpg/440px-Charles_Darwin_seated.jpg"
curl -o public/images/tesla.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/440px-Tesla_circa_1890.jpeg"

# 下载佛光背景
curl -o public/images/buddha-glow.png "https://img.freepik.com/free-vector/golden-light-effect-isolated-transparent-background_1017-28493.jpg"

echo "图片下载完成！" 