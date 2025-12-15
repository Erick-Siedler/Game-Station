
    const selCont = document.getElementById("sel-cont")
    const themeCont = document.getElementById("pref-cont")
    const bts = document.querySelectorAll(".bts")
    const gamebts = document.querySelectorAll(".game-bt")
    const gameCont0 = document.getElementById("game-cont")
    const lightCont = document.getElementById("light-cont")
    const darkColors = ['#FF3B3B','#2EFF77','#3DA9FF','#FFE74A','#C04CFF','#34F4FF','#FF9A37','#FF5AB1','#fabdfcff']
    const lightColors = ['#8A0000','#0F5E2E','#002B70','#665600','#3E006C','#004F58','#703000','#68003F','#130e14ff']
    const startBT = document.getElementById("start-bt-game")
    const counter = document.getElementById("counter")
    const hearts = document.querySelectorAll(".heart")
    const gameLights = document.querySelectorAll(".light-game")

    let going = false
    let lang = "english"
    let theme = "dark"
    let where = "sel"
    let timeoutIDs = []
    let endgame = false
    let actGame = "any"
    let currentLight = null

//button funcs funcs

//menu funcs

function changeLang(){
    if (lang === "english"){
        lang = "portuguese"
        alert("Agora em português")
    } else {
        lang = "english"
        alert("Now in english")
    }
    
}

function changeTheme(){
    const themeIMG = document.getElementById("themeIMG")

    if (theme === "dark"){
        theme = "light"
        themeIMG.src = "imgs/light-icon.png"
        //bts.forEach(b => b.style.border = "solid 10px #292929");
        //gamebts.forEach(g => g.style.border = "solid 10px #292929");
        //tittles.forEach(t => t.classList.remove("darkText"))
        //tittles.forEach(t => t.classList.add("lightText"))
        themeCont.classList.remove("dark")
        themeCont.classList.add("light")

        selCont.classList.remove("dark")
        selCont.classList.add("light")
        
        gameCont0.classList.remove("dark")
        gameCont0.classList.add("light")
    }else{
        theme = "dark"
        themeIMG.src = "imgs/night-icon.png"
        //bts.forEach(b => b.style.border = "transparent");
        //gamebts.forEach(g => g.style.border = "transparent");
        //tittles.forEach(t => t.classList.remove("lightText"))
        //tittles.forEach(t => t.classList.add("darkText"))
        themeCont.classList.remove("light")
        themeCont.classList.add("dark")

        selCont.classList.remove("light")
        selCont.classList.add("dark")

        gameCont0.classList.remove("light")
        gameCont0.classList.add("dark")
    }
}

function closeMenu(){
    if (where === "game"){
        themeCont.style.zIndex = 2
        gameCont0.style.zIndex = 3
        themeCont.style.opacity = 0
        gameCont0.style.opacity = 1
    }else {
        themeCont.style.zIndex = 2
        selCont.style.zIndex = 3
        themeCont.style.opacity = 0
        selCont.style.opacity = 1
    }
}
function openMenu(){
    if (where === "game"){
        themeCont.style.zIndex = 3
        gameCont0.style.zIndex = 1
        themeCont.style.opacity = 1
        gameCont0.style.opacity = 0
    }else{
        themeCont.style.zIndex = 3
        selCont.style.zIndex = 2
        themeCont.style.opacity = 1
        selCont.style.opacity = 0
    }
}

//game related funcs

function startGame(game){
    if (theme === "dark"){
        gameCont0.classList.add("dark")
    } else {
        gameCont0.classList.add("light")
    }
    if (game === "game1"){
        actGame = "game1"
        where = "game"
        gameCont0.style.zIndex = 3
        selCont.style.zIndex = 2
        gameCont0.style.opacity = 1
        selCont.style.opacity = 0
        gameMSG()
        game1()
    } else if (game === "game2"){
        game2()
    } else if (actGame === "game1" && game === "ingame"){
        gameCont0.style.zIndex = 3
        selCont.style.zIndex = 2
        gameCont0.style.opacity = 1
        selCont.style.opacity = 0
        game1()
    } else if (actGame === "game2" && game === "ingame"){
        game2()
    }
}

function stopGame(){
    endgame = true
    currentLight = null
    finishgame()
}

function changeGame(){
    finishgame()
    selCont.style.zIndex = 3
    gameCont0.style.zIndex = 1
    selCont.style.opacity = 1
    gameCont0.style.opacity = 0
    actGame = "any"
    where = "any"

}

function finishgame(){
    hearts.forEach(h => h.style.backgroundColor = "#505050")
    gameLights.forEach(l => l.style.backgroundColor = "white")
    timeoutIDs.forEach(id => clearTimeout(id))
    startBT.style.pointerEvents = "all"
    timeoutIDs = []
}

function gameOver(){
    alert("Game over!!")
    finishgame()
}
//game work funcs

function game1() {
   
    endgame = false
    timeoutIDs = [] 

    let lightRoundLimit = 20
    let fixedDelay = 1500
    let errors = 0

    startBT.style.pointerEvents = "none"

    counter.innerText = 0
    hearts.forEach(h => h.style.backgroundColor = "#360000ad")

    const startPatternTime = startCount()
    let delayLight = startPatternTime + 2000

    gameLights.forEach(light => {
        light.onclick = () => {
            if (!currentLight || endgame) return

            if (light.id === currentLight) {
            } else {
                heartDown(errors,hearts)
                errors++
                if (endgame === true){
                    gameOver()
                }
            }

            currentLight = null
        }
    })

    
    for (let round = 0; round < lightRoundLimit; round++) {

        const id3 = setTimeout(() => {

            const randLight = Math.floor(Math.random() * 9) + 1
            currentLight = `L${randLight}`

            const actLight = document.getElementById(currentLight)

            const actColor = theme === "dark"
                ? lightColors[randLight - 1]
                : darkColors[randLight - 1]

            counter.innerText = round + 1

            actLight.style.backgroundColor = actColor

            const id4 = setTimeout(() => {
                actLight.style.backgroundColor = "white"

                if (!endgame && currentLight === `L${randLight}`) {
                        heartDown(errors, hearts)
                        errors++
                    if (endgame) {
                        gameOver()
                    }
                }

            }, 1000)

            timeoutIDs.push(id4)

        }, delayLight)

        timeoutIDs.push(id3)

        delayLight += fixedDelay
    }
    setTimeout(() => {
        if (!endgame) {
            alert("You win!!")
            startBT.style.pointerEvents = "all"
        }
    }, delayLight + 200)
}
function game2(){
    devMSG()
}

function startCount() {
    const pattern = [
        [1],
        [2, 4],
        [3, 5, 7],
        [6, 8],
        [9]
    ]

    const patternDuration = pattern.length * 500
    const totalTime = 3 * patternDuration

    let delay = 0

    for (let r = 0; r < 3; r++) {

        for (let step = 0; step < pattern.length; step++) {
            const leds = pattern[step]

            leds.forEach((id, index) => {
                const lightEl = document.getElementById(`L${id}`)

                const color = theme === "dark"
                    ? lightColors[index + step]
                    : darkColors[index + step]

                const id1 = setTimeout(() => {
                    lightEl.style.backgroundColor = color
                }, delay)

                timeoutIDs.push(id1)

                const id2 = setTimeout(() => {
                    lightEl.style.backgroundColor = "white"
                }, delay + 400)

                timeoutIDs.push(id2)
            })

            delay += 500
        }
    }

    return totalTime
}

function heartDown(errors,hearts){
    hearts[errors].style.backgroundColor = "#505050"
    if (errors >= hearts.length - 1){
        endgame = true
    }
    
}

function devMSG(){
    alert("Under development!!")
}

function gameMSG(){
    if (lang === "portuguese"){
        if (actGame === "game1"){
            alert("Esse é um jogo de reflexos, você tem 3 vidas, aperte os botões que piscarem antes que elas apagem, boa sorte!")
        }
    } else {
        if (actGame === "game1"){
             alert("This is a reflex game, you have 3 lives, press the buttons that shine before they turn off, good luck!")
        }
    }
}