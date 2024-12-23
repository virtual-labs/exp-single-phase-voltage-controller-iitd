const sliders = {
    slider_D_value: Number(document.querySelector(".slider_D").value),
    slider_V_value: 0,
    d: document.querySelector(".d .slider_D"),
    v: document.querySelector(".v .value-box input"),
    v_knob: document.querySelector(".slider-V-arrow"),
    sliderD(){
        let slider_D = document.querySelector(".slider_D")
        let sliderImg = document.querySelector(".slider-D-arrow")
        let sliderValueInput = document.querySelector(".d .value-box input")
        let val = 0
        
        // slider function  
        function slide(e){
            e = e instanceof Event
            if(e){
                sliderValueInput.value = slider_D.value 
            }
            else{
                slider_D.value = sliderValueInput.value
            }
            val = ((slider_D.value * 95) / 109) - 7
            sliderImg.style.left = `${102.5 + val}px`

            // ! update the text accroding to value
            if(Scenes.currentStep == 9 || Scenes.currentStep == 10 || Scenes.currentStep == 11){
                let betaTempText = Scenes.items.tempTitle41
                let first = 183.6
                let second = 194.1
                let load_1 = 100
                let betaDeg = (values.R == load_1 ? first : second)
                if(slider_D.value <= 30){
                    betaDeg = 180
                }
                betaTempText.setContent(betaDeg)
            }
            // ! update slider details according to wave form
            if(Scenes.currentStep == 4){
                if(slider_D.value==30){
                    sliderImg.style.left = "114px"
                }
                if(slider_D.value==90){
                    sliderImg.style.left = "185.44px"
                }
                if(slider_D.value==150){
                    sliderImg.style.left = "258px"
                }
            }
        }
    
        const slideInput = ()=>{
            let val = sliderValueInput.value
            if(val > 180){
                val = 180
            }
            sliderValueInput.value = val
            slide(false)
        }
    
        slider_D.oninput = slide
        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < 0 || sliderValueInput.value.length == 0){
                sliderValueInput.value = 0
            }
            slide(false)
        })
    },
    sliderV(){
        let sliderVidx = 1;
        let sliderArrow = document.querySelector(".slider-V-arrow")
        let sliderValueInput = document.querySelector(".v .value-box input")
        let angles = [0, 90, 180, 270, 332]
        let valuesOfAngles = [0, 60, 120, 180, 220]
    
        // slider function  
        let rotateArrow = (rot=0)=>{
            sliderArrow.style.transform=`rotate(${angles[sliderVidx]}deg)`
            sliderValueInput.value = valuesOfAngles[sliderVidx]
            this.slider_V = valuesOfAngles[sliderVidx]
            sliderVidx = (sliderVidx + 1) % angles.length
    
        }
    
        sliderArrow.onclick = rotateArrow
    },
    init(){
        this.sliderV()
        this.sliderD()
    },
    resetSlidersValue(){
        document.querySelector(".slider-D-arrow").style.left = "95.5px"
        sliders.d.min = "0"
        sliders.d.max = "180"
        sliders.d.step = "1"
        sliders.d.value = 1 
        document.querySelector(".d .value-box input").value = sliders.d.value
        document.querySelector(".d .value-box input").readOnly = false

        document.querySelector(".slider-V-arrow").style.transform=`rotate(${0}deg)`
        document.querySelector(".v .value-box input").value = 0
    },
    showAllSliders(){
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(".slider-circuit").style.display = "block"
    },
    showAll(){
        let sliderBox = document.querySelector(".universal-slider")
        sliderBox.style.display = "block"
    },
    showSlider(sliderName="",second=""){
        this.showAll()
        document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "none"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "block"
        if(second!="")
            document.querySelector(`.slider .${second}`).style.display = "block"
    },
    hideSlider(sliderName=""){
        this.showAll()
        // document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "none"
    }
}

sliders.init()



/*
use it like showSlider(sliderName)
like: d, v, r -> only those sliders are visible

and for all visible call
sliders.showAll()
*/