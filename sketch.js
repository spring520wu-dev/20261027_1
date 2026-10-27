let spriteSheet; // 儲存角色的水平精靈圖。
let characterX; // 儲存角色目前的水平座標。
let characterY; // 儲存角色目前的垂直座標。
let facing = 1; // 以 1 表示朝右，以 -1 表示朝左。
const frameCountInSheet = 12; // 設定精靈圖中的動畫格數。
const characterScale = 1.5; // 設定角色相對原圖的顯示倍率。
const movementSpeed = 4; // 設定角色每幀移動的像素數。

function preload() { // 在畫面建立前載入角色精靈圖。
  spriteSheet = loadImage('1/戳戳/全部戳戳.png'); // 從專案中的實際圖片路徑載入精靈圖。
} // 結束圖片載入函式。

function setup() { // 初始化全螢幕畫布與角色位置。
  createCanvas(windowWidth, windowHeight); // 建立符合目前視窗尺寸的畫布。
  imageMode(CENTER); // 將圖片繪製座標設定為圖片中心。
  characterX = width / 2; // 將角色水平位置設定在畫布中央。
  characterY = height / 2; // 將角色垂直位置設定在畫布中央。
} // 結束初始化函式。

function draw() { // 每一幀更新畫面、角色位置與動畫。
  background('#caf0f8'); // 使用指定的淺藍色作為畫布背景。

  let isMoving = false; // 記錄角色本幀是否正在移動。
  if (keyIsDown(RIGHT_ARROW)) { // 檢查使用者是否按住鍵盤右鍵。
    characterX += movementSpeed; // 按住右鍵時將角色往右移動。
    facing = 1; // 讓角色面向右方。
    isMoving = true; // 標記角色正在移動以播放動畫。
  } else if (keyIsDown(LEFT_ARROW)) { // 檢查使用者是否按住鍵盤左鍵。
    characterX -= movementSpeed; // 按住左鍵時將角色往左移動。
    facing = -1; // 讓角色面向左方。
    isMoving = true; // 標記角色正在移動以播放動畫。
  } // 結束左右移動判斷。

  characterX = constrain(characterX, 0, width); // 限制角色不會移出畫布左右邊界。

  const frameWidth = spriteSheet.width / frameCountInSheet; // 依圖片寬度計算每格精靈的寬度。
  const frameIndex = isMoving ? floor(frameCount / 6) % frameCountInSheet : 0; // 移動時循環動畫，靜止時使用第一格。
  const sourceX = frameIndex * frameWidth; // 計算目前動畫格在原圖中的水平起點。

  push(); // 暫存畫布狀態以便只翻轉角色圖片。
  translate(characterX, characterY); // 將繪圖原點移到角色目前的位置。
  scale(facing, 1); // 面向左方時水平翻轉角色精靈。
  image( // 繪製目前動畫格並依倍率放大角色。
    spriteSheet, // 指定要繪製的角色精靈圖。
    0, // 將精靈圖中心放在目前繪圖原點的水平位置。
    0, // 將精靈圖中心放在目前繪圖原點的垂直位置。
    frameWidth * characterScale, // 設定角色顯示寬度。
    spriteSheet.height * characterScale, // 設定角色顯示高度。
    sourceX, // 指定來源圖片中目前動畫格的水平起點。
    0, // 指定來源圖片中動畫格的垂直起點。
    frameWidth, // 指定來源圖片中動畫格的寬度。
    spriteSheet.height // 指定來源圖片中動畫格的高度。
  ); // 結束繪製目前動畫格。
  pop(); // 還原畫布狀態以免影響其他繪圖。
} // 結束每幀繪製函式。

function windowResized() { // 視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗寬高。
  characterX = constrain(characterX, 0, width); // 調整角色位置以符合新的畫布寬度。
  characterY = constrain(characterY, 0, height); // 調整角色位置以符合新的畫布高度。
} // 結束視窗尺寸調整函式。

function keyPressed() { // 接收方向鍵事件並避免瀏覽器捲動畫面。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵。
    return false; // 阻止方向鍵觸發瀏覽器的預設捲動行為。
  } // 結束方向鍵判斷。
} // 結束鍵盤事件函式。
