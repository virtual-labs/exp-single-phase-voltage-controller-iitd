// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    Dom.hideAll()
    // remove speech after step done
    setCC("")
    window.speechSynthesis.cancel()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  if(isMute){
    utterance.volume = 0
  }
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  let utterance = textToSpeach(text);
  return utterance;
}
   

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden(isHidden) {
    if (isHidden == false) this.item.style.visibility = "visible";
    else this.item.style.visibility = "hidden";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}



// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true,
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel
    Scenes.items.chart.label[graphIdx].x = xLabel
    // for label
    Scenes.items.yLabel.set(477, 200, null, 220).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(690, 304).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });
    

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ]

    if(startEmpty){
      datasets=[]
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart){
      return chart.data.datasets.length
    }
  },
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

//!images of previous experiment
    

part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_three_two : new Dom(".part3_table_three_two"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_box : new Dom(".universal-slider"),

graph0: new Dom(".graph0"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph9: new Dom(".graph9"),
graph10: new Dom(".graph10"),
graph_box_0: new Dom(".graph_box0"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
graph_box_9: new Dom(".graph_box9"),
graph_box_10: new Dom(".graph_box10"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),



btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),


btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

// Theory

// theory image removed

btn_transparent: new Dom(".btn-transparent"),

// ! Procedure formula Nomenclature images 
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),

// ! Procedure formula Nomenclature images end


// EE2 images added
btn_reset_connections: new Dom(".btn-connections"),

    //! EE12 images added 
      btn_auto : new Dom("btn_auto"),
      btn_check : new Dom("btn_check"),
      btn_delete : new Dom("btn_delete"),
      btn_manual : new Dom("btn_manual"),
      btn_plot : new Dom("btn_plot"),
      btn_record : new Dom("btn_record"),
      btn_reset : new Dom("btn_reset"),
      btn_reset_part_3 : new Dom("btn_reset_part_3"),
      option_1_tab_1 : new Dom("option_1_tab_1"),
      option_1_tab_2 : new Dom("option_1_tab_2"),
      option_1_tab_3 : new Dom("option_1_tab_3"),
      option_1_tab_4 : new Dom("option_1_tab_4"),
      option_1_tab_5 : new Dom("option_1_tab_5"),
      option_2_tab_1 : new Dom("option_2_tab_1"),
      option_2_tab_2 : new Dom("option_2_tab_2"),
      option_2_tab_3 : new Dom("option_2_tab_3"),
      part_1_components : new Dom("part_1_components"),
      part_1_components_2 : new Dom("part_1_components_2"),
      part_1_connection_1_graph : new Dom("part_1_connection_1_graph"),
      part_1_connection_1_text : new Dom("part_1_connection_1_text"),
      part_1_connection_2_graph : new Dom("part_1_connection_2_graph"),
      part_1_connection_2_text : new Dom("part_1_connection_2_text"),
      part_1_connection_3_graph : new Dom("part_1_connection_3_graph"),
      part_1_connection_3_text : new Dom("part_1_connection_3_text"),
      part_1_connection_4_graph : new Dom("part_1_connection_4_graph"),
      part_1_connection_4_text : new Dom("part_1_connection_4_text"),
      part_2_fully_graph_1 : new Dom("part_2_fully_graph_1"),
      part_2_fully_graph_2 : new Dom("part_2_fully_graph_2"),
      part_2_fully_graph_3 : new Dom("part_2_fully_graph_3"),
      part_2_fully_text_1 : new Dom("part_2_fully_text_1"),
      part_2_fully_text_2 : new Dom("part_2_fully_text_2"),
      part_2_fully_text_3 : new Dom("part_2_fully_text_3"),
      part_2_graph_empty : new Dom("part_2_graph_empty"),
      part_2_graph_empty_2 : new Dom("part_2_graph_empty_2"),
      part_2_semi_graph_1 : new Dom("part_2_semi_graph_1"),
      part_2_semi_graph_2 : new Dom("part_2_semi_graph_2"),
      part_2_semi_graph_3 : new Dom("part_2_semi_graph_3"),
      part_2_semi_text_1 : new Dom("part_2_semi_text_1"),
      part_2_semi_text_2 : new Dom("part_2_semi_text_2"),
      part_2_semi_text_3 : new Dom("part_2_semi_text_3"),
      part_2_tab_fully_controlled : new Dom("part_2_tab_fully_controlled"),
      part_2_tab_semi_controlled : new Dom("part_2_tab_semi_controlled"),
      part_3_option_1 : new Dom("part_3_option_1"),
      part_3_option_1_alpha_val : new Dom("part_3_option_1_alpha_val"),
      part_3_option_1_alpha_vs : new Dom("part_3_option_1_alpha_vs"),
      part_3_option_1_beta_val : new Dom("part_3_option_1_beta_val"),
      part_3_option_1_load_1 : new Dom("part_3_option_1_load_1"),
      part_3_option_1_load_2 : new Dom("part_3_option_1_load_2"),
      part_3_option_2 : new Dom("part_3_option_2"),
      part_3_select_option_full : new Dom("part_3_select_option_full"),
      part_4_circuit : new Dom("part_4_circuit"),
      part_4_fan : new Dom("part_4_fan"),
      part_4_heading : new Dom("part_4_heading"),
      right_tick_1 : new Dom("right_tick_1"),
      right_tick_2 : new Dom("right_tick_2"),
      right_tick_3 : new Dom("right_tick_3"),
      right_tick_4 : new Dom("right_tick_4"),
      right_tick_5 : new Dom("right_tick_5"),

      part_2_circuit_empty : new Dom("part_2_circuit_empty"),
      part_2_circuit_semi : new Dom("part_2_circuit_semi"),
      part_2_circuit_fully : new Dom("part_2_circuit_fully"),
      part_3_option_2_alpha_vs : new Dom("part_3_option_2_alpha_vs"),

      option_1_circuit_upper_part: new Dom("option_1_circuit_upper_part"),
      helper: new Dom("helper"),
      
      part_1_connect_text : new Dom("part_1_connect_text"),
      part_1_right_tick : new Dom("part_1_right_tick"),
      part_1_select_text : new Dom("part_1_select_text"),
      part_1_tab_1 : new Dom("part_1_tab_1"),
      part_1_tab_2 : new Dom("part_1_tab_2"),
      part_1_tab_3 : new Dom("part_1_tab_3"),
      part_1_tab_4 : new Dom("part_1_tab_4"),
   
      //new imgs updation
      
      part_1_connect_text : new Dom("part_1_connect_text"),
      part_1_right_tick_1 : new Dom("part_1_right_tick_1"),
      part_1_right_tick_2 : new Dom("part_1_right_tick_2"),
      part_1_right_tick_3 : new Dom("part_1_right_tick_3"),
      part_1_right_tick_4 : new Dom("part_1_right_tick_4"),
      part_1_select_text : new Dom("part_1_select_text"),
      part_1_tab_1 : new Dom("part_1_tab_1"),
      part_1_tab_2 : new Dom("part_1_tab_2"),
      part_1_tab_3 : new Dom("part_1_tab_3"),
      part_1_tab_4 : new Dom("part_1_tab_4"),
    
//!  EE12 images end here


concept_development: new Dom(".concept_development"), 
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


  chart: {
    graph: [
      graph1=null,
      graph2=null,
      graph3=null,
      graph4=null,
      graph5=null,
      graph6=null,
      graph7=null,
      graph8=null,
      graph9=null,
      graph10=null,
      graph11=null,
    ],
    label: [
      label1 = {
        x: "Label 2",
        y: "Label 1",
      },
      label2 = {
        x: "Label 2",
        y: "Label 1",
      },
      label3 = {
        x: "Label 2",
        y: "Label 1",
      },
      label4 = {
        x: "Label 2",
        y: "Label 1",
      },
      label5 = {
        x: "Label 2",
        y: "Label 1",
      },
      label6 = {
        x: "Label 2",
        y: "Label 1",
      },
      label7 = {
        x: "Label 2",
        y: "Label 1",
      },
      label8 = {
        x: "Label 2",
        y: "Label 1",
      },
      label9 = {
        x: "Label 2",
        y: "Label 1",
      },
      label10 = {
        x: "Label 2",
        y: "Label 1",
      },
      label11 = {
        x: "Label 2",
        y: "Label 1",
      },
    ]
  }


  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),

      (objective = function () {
        setIsProcessRunning(true);
        Dom.hideAll()
        // require
        Scenes.items.slider_box.hide()
        
        let btn_transparent = Scenes.items.btn_transparent.set().item;
  
        Scenes.items.concept_development.set().styles({
          zIndex: "5000",
          scale: "1 0.915",
          top: "-144px",
          position: "absolute",
        })
  
        // ! Slide ended enable the button next button
        function checkIsSlideEnded(){
          let isSlideEnded = localStorage.getItem("isSlideEnded")
          if(isSlideEnded=="true"){
            btn_transparent.disabled = false
            setIsProcessRunning(false)
            btn_transparent.classList.remove("btn-disabled")
            // setCC("Click next to goto next slide.")
            Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
            btn_transparent.onclick = ()=>{
              Scenes.next()
              localStorage.setItem("isSlideEnded",false)
              window.clearInterval(interval)
            }
          }
        }
        var interval = window.setInterval(checkIsSlideEnded, 1000)
          
        return true;
      }),
      
    //! Circuit formulation part1
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()
      // Scenes.items.btn_reset_connections.styles({
      //   position: "absolute",
      //   right: 0,
      //   top: "195px",
      //   backgroundColor: "blue",
      //   color: "white",
      // })

      // Scenes.setStepHeading("Step-1", "Circuit Formulation");
      // Scenes.changeHeader("1")
      // Scenes.showPopup(1)

      // Scenes.items.btn_popup_box.styles({
        // display : "none"
      // })

      // Scenes.items.changeHeader.setContent("sneha")
      setCC("Connect the equipment and components to form semicontrolled AC voltage controller circuit")
      // Dom.setBlinkArrowRed(true, 49, 49, 30,30,90).play()


      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.part_1_components.set(26, -3-15, 388, 868)
      Scenes.items.btn_reset.set(820, -36, 42).zIndex(1)
      Scenes.items.btn_check.set(820, 10, 42).zIndex(1)
      // Scenes.items.part_1_select_text.set(35, -35, 42)
      Scenes.items.part_1_connect_text.set(35, -35, 42)

      Scenes.items.part_1_right_tick_1.set(12, 18, 10).zIndex(1).hide()
      // Scenes.items.part_1_right_tick_2.set(132, 18, 10).zIndex(1)
      // Scenes.items.part_1_right_tick_3.set(252, 18, 10).zIndex(1)
      // Scenes.items.part_1_right_tick_4.set(376, 18, 10).zIndex(1)


      let tabs = [   
        Scenes.items.part_1_tab_1.set(9, 13, 43-3),
        Scenes.items.part_1_tab_2.set(9+120, 13, 43-3).opacity(0.5),
        Scenes.items.part_1_tab_3.set(9+240, 13, 40-3).opacity(0.5),
        Scenes.items.part_1_tab_4.set(9+364, 13, 40-3).opacity(0.5)
      ]

      // function toggleImgs (){
      //   Scenes.items.part_1_connect_text.hide()
      //   Scenes.items.part_1_connect_text.show()
      // } 

      // let idx = 2
      // tabs.forEach(()=>{
      //   tabs[0].item.onclick = ()=>{
      //     toggleImgs()
      //   Scenes.steps[idx + 0]()
      // }
      // tabs[1].item.onclick = ()=>{
      //   toggleImgs()
      //   Scenes.steps[idx + 1]()
      // }
      // tabs[2].item.onclick = ()=>{
      //     toggleImgs()
      //     Scenes.steps[idx + 2]()
      //   }
      //   tabs[3].item.onclick = ()=>{
      //     toggleImgs() 
      //     Scenes.steps[idx + 3]()
      //   }
      // })


      // Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()


      //! Final position index if 1st connection is correct
      Scenes.items.part_1_connection_1_text.set(3, 390, 52).hide()
      Scenes.items.part_1_connection_1_graph.set(272, 369, 71, 637).hide()

      //! Final position index if 2nd connection is correct
      // Scenes.items.part_1_connection_2_text.set(3, 390, 52)
      // Scenes.items.part_1_connection_2_graph.set(272, 369, 71, 637)
      
      //! Final position index if 3rd connection is correct
      // Scenes.items.part_1_connection_3_text. set(7, 271, 180)
      // Scenes.items.part_1_connection_3_graph.set(272, 369, 71, 637)
            
      //! Final position index if 4th connection is correct
      // Scenes.items.part_1_connection_4_text.set(3, 396, 38)
      // Scenes.items.part_1_connection_4_graph.set(272, 369, 71, 637)
      
      //! Final position when all connections are done
      // Scenes.items.part_1_components_2.set(-6, -24, 453)
      
  
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){

          Dom.setBlinkArrowRed(-1)

          setCC("Here, the “SCR” controls the output voltage only in “positive” half cycle while the “Diode” is forward biased in the “negative” half cycle of AC input voltage.")

          // * destroy all the connection
         
          //! Final position index if 1st connection is correct
          Scenes.items.part_1_right_tick_1.show()
          Scenes.items.part_1_connection_1_text.show()
          Scenes.items.part_1_connection_1_graph.show()     
          
          //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, Press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 17
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 5, 6, 15, 15]
          let yAxisFixed = [3, 4, 7, 10, 16, 11 ,14]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 7
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){

              setCC("Check the Connections")
              Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1){
              let radius = 8
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: "#c00000" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "#c00000", strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint()
            var exampleEndpoint3 = setEndPoint(2)
            var exampleEndpoint4 = setEndPoint()
            var exampleEndpoint5 = setEndPoint(2)
            var exampleEndpoint6 = setEndPoint()
            var exampleEndpoint7 = setEndPoint()
            var exampleEndpoint8 = setEndPoint()
            var exampleEndpoint9 = setEndPoint()
       

            function addEndPoints(){
              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              //conn 5
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              
              // conn cann't cnnct
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

         
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    //! Circuit formulation part2
    (step2 = function () {
      setIsProcessRunning(true);

      //to destroy all the connections 
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })

      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()


      // Scenes.items.changeHeader.setContent("sneha")
      setCC("Connect the equipment and components to form semicontrolled AC voltage controller circuit")


      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.part_1_components.set(26, -3-15, 388, 868)
      Scenes.items.btn_reset.set(820, -36, 42).zIndex(1)
      Scenes.items.btn_check.set(820, 10, 42).zIndex(1)
      Scenes.items.part_1_connect_text.set(35, -35, 42)

      

      Scenes.items.part_1_right_tick_1.set(12, 18, 10).zIndex(1)
      Scenes.items.part_1_right_tick_2.set(132, 18, 10).zIndex(1).hide()
      // Scenes.items.part_1_right_tick_3.set(252, 18, 10).zIndex(1)
      // Scenes.items.part_1_right_tick_4.set(376, 18, 10).zIndex(1)

      
      let tabs = [   
        Scenes.items.part_1_tab_1.set(9, 13, 43-3).opacity(0.5),
        Scenes.items.part_1_tab_2.set(9+120, 13, 43-3),
        Scenes.items.part_1_tab_3.set(9+240, 13, 40-3).opacity(0.5),
        Scenes.items.part_1_tab_4.set(9+364, 13, 40-3).opacity(0.5)
      ]

      // let idx = 2
      // tabs.forEach(()=>{
      //   tabs[0].item.onclick = ()=>{
      //     Scenes.steps[idx + 0]()
      //   }
      //   tabs[1].item.onclick = ()=>{
      //     Scenes.steps[idx + 1]()
      //   }
      //   tabs[2].item.onclick = ()=>{
      //     Scenes.steps[idx + 2]()
      //   }
      //   tabs[3].item.onclick = ()=>{
      //     Scenes.steps[idx + 3]()
      //   }
      // })


      // Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()


      //! Final position index if 1st connection is correct
      // Scenes.items.part_1_connection_1_text.set(31, -33, 78).hide()
      // Scenes.items.part_1_connection_1_graph.set(272, 369, 71, 637). hide()

      //! Final position index if 2nd connection is correct
      Scenes.items.part_1_connection_2_text.set(3, 390, 52).hide()
      Scenes.items.part_1_connection_2_graph.set(272, 369, 71, 637).hide()
      
      //! Final position index if 3rd connection is correct
      // Scenes.items.part_1_connection_3_text.set(7, -43, 124)
      // Scenes.items.part_1_connection_3_graph.set(272, 369, 71, 637)
      
      //! Final position index if 4th connection is correct
      // Scenes.items.part_1_connection_4_text.set(19, -33, 62)
      // Scenes.items.part_1_connection_4_graph.set(272, 369, 71, 637)
      
      //! Final position when all connections are done
      // Scenes.items.part_1_components_2.set(-6, -24, 453)
      
  
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){
          Dom.setBlinkArrowRed(-1)

          setCC("Here, the “SCR” controls the output voltage only in “Negative” half cycle while the “Diode” is forward biased in the “Positive” half cycle of AC input voltage.")

          // * destroy all the connection
         
          //! Final position index if 2nd connection is correct
          Scenes.items.part_1_right_tick_2.show()
          Scenes.items.part_1_connection_2_text.show()
          Scenes.items.part_1_connection_2_graph.show()
              
          //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, Press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 17
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 5, 6, 15, 15]
          let yAxisFixed = [3, 4, 8, 9, 16, 12 ,13]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 7
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              
              Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()
              setCC("Check the Connections")



              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1){
              let radius = 8
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: "#c00000" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "#c00000", strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint()
            var exampleEndpoint3 = setEndPoint(2)
            var exampleEndpoint4 = setEndPoint()
            var exampleEndpoint5 = setEndPoint(2)
            var exampleEndpoint6 = setEndPoint()
            var exampleEndpoint7 = setEndPoint()
            var exampleEndpoint8 = setEndPoint()
            var exampleEndpoint9 = setEndPoint()
            // // var exampleEndpoint10 = setEndPoint()
            // // var exampleEndpoint11 = setEndPoint()
            // // var exampleEndpoint12 = setEndPoint()

            function addEndPoints(){
              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              //conn 5
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              
              // conn cann't cnnct
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

         
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    //! Circuit formulation part3
    (step3 = function () {
      setIsProcessRunning(true);

      //to destroy all the connections 
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })

      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()

      // Scenes.items.btn_reset_connections.styles({
      //   position: "absolute",
      //   right: 0,
      //   top: "195px",
      //   backgroundColor: "blue",
      //   color: "white",
      // })

      // Scenes.setStepHeading("Step-1", "Circuit Formulation");
      // Scenes.changeHeader("1")
      // Scenes.showPopup(1)

      // Scenes.items.btn_popup_box.styles({
        // display : "none"
      // })

      // Scenes.items.changeHeader.setContent("sneha")
      setCC("Connect the equipment and components to form uncontrolled AC voltage controller circuit")

      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.part_1_components.set(26, -3-15, 388, 868)
      Scenes.items.btn_reset.set(820, -36, 42).zIndex(1)
      Scenes.items.btn_check.set(820, 10, 42).zIndex(1)
      Scenes.items.part_1_connect_text.set(35, -35, 42)


      Scenes.items.part_1_right_tick_1.set(12, 18, 10).zIndex(1)
      Scenes.items.part_1_right_tick_2.set(132, 18, 10).zIndex(1)
      Scenes.items.part_1_right_tick_3.set(252, 18, 10).zIndex(1).hide()
      // Scenes.items.part_1_right_tick_4.set(376, 18, 10).zIndex(1)


      let tabs = [   
        Scenes.items.part_1_tab_1.set(9, 13, 43-3).opacity(0.5),
        Scenes.items.part_1_tab_2.set(9+120, 13, 43-3).opacity(0.5),
        Scenes.items.part_1_tab_3.set(9+240, 13, 40-3),
        Scenes.items.part_1_tab_4.set(9+364, 13, 40-3).opacity(0.5)
      ]

      // Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()




      //! Final position index if 1st connection is correct
      // Scenes.items.part_1_connection_1_text.set(31, -33, 78).hide()
      // Scenes.items.part_1_connection_1_graph.set(272, 369, 71, 637). hide()

      //! Final position index if 2nd connection is correct
      // Scenes.items.part_1_connection_2_text.set(31, -33, 78).hide()
      // Scenes.items.part_1_connection_2_graph.set(272, 369, 71, 637).hide()
      
      //! Final position index if 3rd connection is correct
      Scenes.items.part_1_connection_3_text. set(7, 271, 180).hide()
      Scenes.items.part_1_connection_3_graph.set(272, 369, 71, 637).hide()
      
      //! Final position index if 4th connection is correct
      // Scenes.items.part_1_connection_4_text.set(19, -33, 62)
      // Scenes.items.part_1_connection_4_graph.set(272, 369, 71, 637)
      
      //! Final position when all connections are done
      // Scenes.items.part_1_components_2.set(-6, -24, 453)
      
  
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){
          Dom.setBlinkArrowRed(-1)
          setCC("The diode based circuit will allow both the positive and negative half cycles and hence load voltage is same as input ac voltage  and no control on the load power.")

          // * destroy all the connection
         
          //! Final position index if 2nd connection is correct
          Scenes.items.part_1_right_tick_3.show()
          Scenes.items.part_1_connection_3_text.show()
          Scenes.items.part_1_connection_3_graph.show()
      
              
          //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, Press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 17
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 5, 6, 15, 15]
          let yAxisFixed = [3, 4, 8, 10, 16, 12 ,14]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 7
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              
              setCC("Check the Connections")
              Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1){
              let radius = 8
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: "#c00000" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "#c00000", strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint()
            var exampleEndpoint3 = setEndPoint(2)
            var exampleEndpoint4 = setEndPoint()
            var exampleEndpoint5 = setEndPoint(2)
            var exampleEndpoint6 = setEndPoint()
            var exampleEndpoint7 = setEndPoint()
            var exampleEndpoint8 = setEndPoint()
            var exampleEndpoint9 = setEndPoint()
            // // var exampleEndpoint10 = setEndPoint()
            // // var exampleEndpoint11 = setEndPoint()
            // // var exampleEndpoint12 = setEndPoint()

            function addEndPoints(){
              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              //conn 5
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              
              // conn cann't cnnct
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

         
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    //! Circuit formulation part4
    (step4 = function () {
      setIsProcessRunning(true);

      //to destroy all the connections 
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })

      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()

      // Scenes.items.btn_reset_connections.styles({
      //   position: "absolute",
      //   right: 0,
      //   top: "195px",
      //   backgroundColor: "blue",
      //   color: "white",
      // })

      // Scenes.setStepHeading("Step-1", "Circuit Formulation");
      // Scenes.changeHeader("1")
      // Scenes.showPopup(1)

      // Scenes.items.btn_popup_box.styles({
        // display : "none"
      // })

      // Scenes.items.changeHeader.setContent("sneha")
      setCC("Connect the circuit to form fully controlled AC voltage controller")

      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.part_1_components.set(26, -3-15, 388, 868)
      Scenes.items.btn_reset.set(820, -36, 42).zIndex(1)
      Scenes.items.btn_check.set(820, 10, 42).zIndex(1)
      Scenes.items.part_1_connect_text.set(35, -35, 42)

      // Scenes.items.part_1_right_tick_4.set(376, 18, 10).zIndex(1)
      
      Scenes.items.part_1_right_tick_1.set(12, 18, 10).zIndex(1)
      Scenes.items.part_1_right_tick_2.set(132, 18, 10).zIndex(1)
      Scenes.items.part_1_right_tick_3.set(252, 18, 10).zIndex(1)
      Scenes.items.part_1_right_tick_4.set(376, 18, 10).zIndex(1).hide()


      let tabs = [   
        Scenes.items.part_1_tab_1.set(9, 13, 43-3).opacity(0.5),
        Scenes.items.part_1_tab_2.set(9+120, 13, 43-3).opacity(0.5),
        Scenes.items.part_1_tab_3.set(9+240, 13, 40-3).opacity(0.5),
        Scenes.items.part_1_tab_4.set(9+364, 13, 40-3)
      ]

      // Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()


      //! Final position index if 1st connection is correct
      // Scenes.items.part_1_connection_1_text.set(31, -33, 78).hide()
      // Scenes.items.part_1_connection_1_graph.set(272, 369, 71, 637). hide()

      //! Final position index if 2nd connection is correct
      // Scenes.items.part_1_connection_2_text.set(31, -33, 78).hide()
      // Scenes.items.part_1_connection_2_graph.set(272, 369, 71, 637).hide()
      
      //! Final position index if 3rd connection is correct
      // Scenes.items.part_1_connection_3_text.set(7, -43, 124)
      // Scenes.items.part_1_connection_3_graph.set(272, 369, 71, 637)
      
      //! Final position index if 4th connection is correct
       Scenes.items.part_1_connection_4_text.set(3, 396, 38).hide()
      Scenes.items.part_1_connection_4_graph.set(272, 369, 71, 637).hide()
      
      //! Final position when all connections are done
      // Scenes.items.part_1_components_2.set(-6, -24, 453)
      
  
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){
          Dom.setBlinkArrowRed(-1)
          setCC("The SCR based circuit will control both the positive and negative half cycles and hence controls the load voltage and load power.")

          // * destroy all the connection
         
          //! Final position index if 2nd connection is correct
          Scenes.items.part_1_right_tick_4.show()
          Scenes.items.part_1_connection_4_text.show()
          Scenes.items.part_1_connection_4_graph.show()
              
          //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, Press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 17
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 5, 6, 15, 15]
          let yAxisFixed = [3, 4, 7, 9, 16, 11 ,13]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 7
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){

              setCC("Check the Connections")
              
              Dom.setBlinkArrowRed(true,783, 15, 30,30,180).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1){
              let radius = 8
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: "#c00000" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "#c00000", strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint()
            var exampleEndpoint3 = setEndPoint(2)
            var exampleEndpoint4 = setEndPoint()
            var exampleEndpoint5 = setEndPoint(2)
            var exampleEndpoint6 = setEndPoint()
            var exampleEndpoint7 = setEndPoint()
            var exampleEndpoint8 = setEndPoint()
            var exampleEndpoint9 = setEndPoint()
            // // var exampleEndpoint10 = setEndPoint()
            // // var exampleEndpoint11 = setEndPoint()
            // // var exampleEndpoint12 = setEndPoint()

            function addEndPoints(){
              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              //conn 5
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              
              // conn cann't cnnct
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

         
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    //! Circuit formulation part5
    (step5 = function () {
      setIsProcessRunning(true);

      //to destroy all the connections 
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })

      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()

      //! Final position when all connections are done
      Scenes.items.part_1_components_2.set(-8, -24, 462, 952.5)

      setCC("Here, a generalized single-phase AC voltage controller configuration is shown.")

      setCC("Different AC voltage controller circuits can easily be generated using various combination of diodes and SCRs.")

      setCC(" However, some of them may not control the load voltage and power and all such details are listed  here in  the “Table”.")

      //to go to next step 
      setCC("Click 'Next' to go to next step");
      Dom.setBlinkArrow(true, 790, 544).play();
      setIsProcessRunning(false);
      

    
      // ------ end



      return true
    }),


    //! voltage and current waveforms
    (step6 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      //! functionality

      
      // to hide the sliders default value using as a overlay layer
      
      // let sliderOverlayLayer = Scenes.items.tempTitle19.setContent("<pre>30             90            150</pre>").styles({
      //   height: "11px",
      //   width: "185px",
      //   zIndex: "1000",
      //   backgroundColor: "rgb(208, 5, 208)",
      // }).set(364,107)
      // let preOfLayer = new Dom(sliderOverlayLayer.item.firstChild)
      // preOfLayer.styles({
      //   fontSize: "10px",
      //   margin: "0",
      // })
      
      let btn_plot = Scenes.items.btn_plot
      let btn_reset = Scenes.items.btn_reset

      //! onclick for reset button
      btn_reset.item.onclick = function(){
        sliders.resetSlidersValue()
        Scenes.steps[3]()
      }

      let fully_controlled = Scenes.items.part_2_tab_fully_controlled.item
      let semi_controlled = Scenes.items.part_2_tab_semi_controlled.item
      
      let fully_controlled_graph = false;
      let semi_controlled_graph = false;

      function stepTutorial2(){

        setCC("Select the type of AC voltage controller, set firing angle and observe various waveforms.")
        Dom.setBlinkArrowRed(true,333, 260, 30,30,-90).play()

        //! onclick on fullly controlled tab
          fully_controlled.onclick = ()=>{

          setCC("Set the Firing angle.")
          Dom.setBlinkArrowRed(true,395,125,30,30,90).play()

          //* circuit for fully controlled

          Scenes.items.tempTitle9.show()
          Scenes.items.tempTitle10.hide()
          
          Scenes.items.part_2_graph_empty.show()
          Scenes.items.part_2_graph_empty_2.hide()
          Scenes.items.part_2_circuit_empty.hide()
          Scenes.items.part_2_circuit_semi.hide()
          Scenes.items.part_2_circuit_fully.show()

          // currentGraph = Scenes.items.part_2_graph_empty

          fully_controlled_graph = true;
          semi_controlled_graph = false;
        
          sliders.d.onclick = ()=>{
            
            Scenes.items.part_2_fully_text_1.hide()
            Scenes.items.part_2_semi_text_1.hide()

            setCC("Press the plot button")
            Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
          }    
        } 

        semi_controlled.onclick = ()=>{

          fully_controlled_graph = false
          // Scenes.items.part_2_text_for_r_load.hide()

          setCC("Select the value of Firing angle.")
          Dom.setBlinkArrowRed(true,395,125,30,30,90).play()

          Scenes.items.part_2_graph_empty_2.show()
          Scenes.items.part_2_graph_empty.hide()
          Scenes.items.part_2_circuit_empty.hide()
          Scenes.items.part_2_circuit_fully.hide()

          // currentGraph = Scenes.items.part_2_graph_empty_2

          //* circuit for semi controlled
          Scenes.items.tempTitle10.show()
          Scenes.items.tempTitle9.hide()
          Scenes.items.part_2_circuit_semi.show()
          semi_controlled_graph = true;
          fully_controlled_graph = false;

          sliders.d.onclick = ()=>{

            Scenes.items.part_2_fully_text_1.hide()
            Scenes.items.part_2_semi_text_1.hide()
            
            setCC("Press the plot button")
            Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
          }    
        }  
        
      }

      stepTutorial2()
      Scenes.items.btn_next.show();

      //! Required Items
      let helperImg = new Dom(".slider-circuit-helper").set()
      // Scenes.items.slider_box.item.style.scale = "1";
      Scenes.items.slider_box.show("flex").set(96, -37);
      sliders.showSlider('d')


      Scenes.items.part_2_fully_text_1.set(4, 192, 54, 619).hide()
      Scenes.items.part_2_semi_text_1.set(4, 192, 54, 619).hide()
      // Scenes.items.part_2_fully_text_2.set(4, 192, 54, 619).hide()
      // Scenes.items.part_2_fully_text_3.set(4, 192, 54, 619).hide()
      // Scenes.items.part_2_semi_text_2.set(4, 192, 54, 619).hide()
      // Scenes.items.part_2_semi_text_3.set(4, 192, 54, 619).hide()

      let us = {
        color: "#c81110",
        fontSize: "0.7rem",
        fontStyle: ""
      }
      Scenes.items.tempTitle9.setContent("T<sub>2</sub>").set(426, 37).styles(us).zIndex(20000).hide()
      Scenes.items.tempTitle10.setContent("D").set(426, 37).styles(us).zIndex(20000).hide()



      //! Required items 
      Scenes.items.btn_reset.set(10, 352, 50)
      Scenes.items.btn_plot.set(125, 352, 50)
      Scenes.items.part_2_tab_fully_controlled.set(449-180, 298, 76)
      Scenes.items.part_2_tab_semi_controlled.set(449, 298, 76)
      Scenes.items.part_2_circuit_empty.set(14, -58, 230).zIndex(1)
      Scenes.items.part_2_circuit_fully.set(14, -70, 240, 609).zIndex(2).hide()
      Scenes.items.part_2_circuit_semi.set(14, -70, 240, 609).zIndex(2).hide()
    
      Scenes.items.part_2_graph_empty.set(625, -43, 433, 310)
      Scenes.items.part_2_graph_empty_2.set(625, -43, 433, 310).hide()

      //* fully controlled graph
      // Scenes.items.part_2_fully_graph_1.set(665, -74, 484).zIndex(1).hide()
      Scenes.items.part_2_fully_graph_1.set(646, -74, 484, 273).zIndex(1).hide()
      Scenes.items.part_2_fully_graph_2.set(665, -74, 484, 260).zIndex(1).hide()
      // Scenes.items.part_2_fully_graph_3.set(680, -74, 484, 240).zIndex(1).hide()
      Scenes.items.part_2_fully_graph_3.set(672, -74, 484, 250).zIndex(1).hide()

      //* semi controlled graph
      // Scenes.items.part_2_semi_graph_1.set(655, -74, 484, 260).zIndex(1).hide()
      Scenes.items.part_2_semi_graph_1.set(645, -74, 484, 278).zIndex(1).hide()
      Scenes.items.part_2_semi_graph_2.set(672, -74, 484, 250).zIndex(1).hide()
      Scenes.items.part_2_semi_graph_3.set(672, -74, 484, 250).zIndex(1).hide()
 
      let currentGraph = Scenes.items.part_2_graph_empty

      // *  chage the step size of the sliders
      // let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
      let dutyRatioSlider = sliders.d;
      let valueInput = document.querySelector(".d .value-box input")
      valueInput.readOnly = true
      dutyRatioSlider.min = "30"
      dutyRatioSlider.max = "150"
      dutyRatioSlider.step = "60"
      dutyRatioSlider.value = 30
      valueInput.value = 30
      // 30 90 150

      //! In the end arrow blink to all position to tell user that he/she can proceed more if they want
      function arrowBlinkForAll(){
        setCC("Change the parameters to see the effect")
        anime.timeline({
          easing: "linear",
          duration: 1500,
        })
        .add({
          delay: 3000,
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,333, 260, 30,30,-90).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,509, 260,30,30,-90).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,395,125,30,30,90).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
          }
        })
      }
 
      // ! onclick for plot
      let isClicked = false
      let clickIdx = 0;

      btn_plot.item.onclick = function () {

        console.log("btn plot click", clickIdx)

        
        if(clickIdx == 0 || clickIdx == 1 || clickIdx == 2){
          Scenes.items.part_2_fully_text_1.show() 
        }

        if(clickIdx == 3 || clickIdx == 4 || clickIdx == 5){
          Scenes.items.part_2_semi_text_1.show() 
        }


        if(clickIdx == 2){
          setCC("Select the R L Load, set firing angle and observe various waveforms.")
          Dom.setBlinkArrowRed(true,509, 260,30,30,-90).play()
        }
        else if(clickIdx  >=  5){
          // Scenes.items.part_2_text_for_r_l_load.hide() 
          // Scenes.items.part_2_text_for_r_load.hide()
          Dom.setBlinkArrowRed(-1) 
          if(isClicked == false){
          arrowBlinkForAll()
          isClicked = true
        }

        }
        else{   
          setCC("Select the value of Firing angle.")
          Dom.setBlinkArrowRed(true,395,125,30,30,90).play()
        }
        clickIdx++;

        let dutyRatioValue = Number(sliders.d.value);
        console.log("d",dutyRatioValue)

        if (dutyRatioValue == 30){
          if(fully_controlled_graph == true ){
            currentGraph.hide();
            Scenes.items.part_2_fully_graph_1.show();
            console.log(fully_controlled_graph,currentGraph)
            currentGraph = Scenes.items.part_2_fully_graph_1;  
          }
          else {
            currentGraph.hide();
            Scenes.items.part_2_semi_graph_1.show();
            console.log(fully_controlled_graph,currentGraph)
            currentGraph = Scenes.items.part_2_semi_graph_1;  
          }
        }

        if (dutyRatioValue == 90){
          if(fully_controlled_graph == true ){
            currentGraph.hide();
            Scenes.items.part_2_fully_graph_2.show();
            currentGraph = Scenes.items.part_2_fully_graph_2;  
          }
          else {
            currentGraph.hide();
            Scenes.items.part_2_semi_graph_2.show();
            currentGraph = Scenes.items.part_2_semi_graph_2;  
          }
        }

        if (dutyRatioValue == 150){
          if(fully_controlled_graph == true ){
            currentGraph.hide();
            Scenes.items.part_2_fully_graph_3.show();
            currentGraph = Scenes.items.part_2_fully_graph_3;  
          }
          else {
            currentGraph.hide();
            Scenes.items.part_2_semi_graph_3.show();
            currentGraph = Scenes.items.part_2_semi_graph_3;  
          }
        }
        

        // completed

        if(fully_controlled == true){
          Scenes.items.part_2_graph_empty.set(625, -43, 433, 310)
        }
        else{
          Scenes.items.part_2_graph_empty_2.set(625, -43, 433, 310)
        }

        
        
        setIsProcessRunning(false);
      };
      

      
      return true
    }),

    //! part 3 select option
    (step7 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-3", "");
      
      // * remove all previous restrictions
      
      // * Required Elements

      //! new added
      Scenes.items.part_3_select_option_full.set(35, -22, 410)
      Scenes.items.part_3_option_1.set(540, -20, 192).zIndex(1)
      Scenes.items.part_3_option_2.set(540, 195, 192).zIndex(1)
      // // hide the slider
      Scenes.items.slider_box.hide()
      // resloving the step to css
      Scenes.items.slider_box.item.style.scale = "1";


      // let rightTicks = [
      //   Scenes.items.right_tick_1.set(640,35,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_2.set(655,105,44).zIndex(2001).hide(),
      //   Scenes.items.right_tick_3.set(655,180,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_4.set(645,255,44).zIndex(2000).hide()
      // ]

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()

      let rightTicks = [
        Scenes.items.right_tick_1.set(559,1,20).hide(),
        Scenes.items.right_tick_2.set(559,216,20).hide(),
      ]

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }


      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_3_option_1,
        Scenes.items.part_3_option_2,
      ]

      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        
        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[0+9]()
      }
      const opTwo = ()=>{
        if(Scenes.optionsDone[0] == 0){ return }
        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[1+9]()
      }

      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      if((Scenes.optionsDone[0] == 0 && Scenes.optionsDone[1] == 0) || Scenes.optionsDone[1] == 1){
        Dom.setBlinkArrowRed(true,499, 60, 30,30,180).play()
        setCC("First select the Fully controlled AC Voltage controller and proceed for experimentation")
      }else if(Scenes.optionsDone[0] == 1){
        Dom.setBlinkArrowRed(true,499, 276, 30,30,180).play()
        setCC("Select the semicontrolled AC Voltage controller and proceed for experimentation")
      }

      // ! if all options done then exit
      let exit = true
      let maxOptions = 2
      for(let i=0;i<maxOptions;i++){
        if(Scenes.optionsDone[i]==1){
          rightTicks[i].show()
        }
        if(Scenes.optionsDone[i]==0){
          exit = false
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
        Scenes.currentStep = 11
        Scenes.next()
      }

      return true;

    }),

    //! fully controlled
    (step8 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      )
      // ! show the slider
      Scenes.items.slider_box.set(0,-50).show("flex")
      sliders.resetSlidersValue()
      sliders.showAllSliders()
      //!new added for EE12
      new Dom(".slider-circuit-helper").hide()
      Scenes.items.part3_table_three.set(10)
      Scenes.items.part_3_option_1_alpha_val.set(610, 377, 35)
      Scenes.items.part_3_option_1_beta_val.set(610, 337, 35)
      Scenes.items.part_3_option_1_load_1.set(550, -74, 70)
      Scenes.items.part_3_option_1_load_2.set(552, 0, 70)
      Scenes.items.part_3_option_1_alpha_vs.set(634, -81, 95)
      Scenes.items.option_1_tab_1.set(876-240+10, 12, 75).opacity(0.4)
      Scenes.items.option_1_tab_2.set(876-180+10, 12, 75).opacity(0.4)
      Scenes.items.option_1_tab_3.set(876-120+10, 12, 75).opacity(0.4)
      Scenes.items.option_1_tab_4.set(876-60+10, 12, 75).opacity(0.4)
      Scenes.items.option_1_tab_5.set(876+10, 12, 75).opacity(0.4)
      let us = {
        color: "#c81110",
        fontSize: "0.7rem",
        fontStyle: ""
      }
      Scenes.items.tempTitle16.setContent("T<sub>2</sub>").set(345, 29).styles(us).zIndex(20000)

      Scenes.items.btn_record.set(764, 335, 80)
      Scenes.items.btn_reset_part_3.set(843 + 10, 368+8, 40)
      Scenes.items.btn_delete.set(843 + 10, 368+8-50+8, 40)

      let rightTicks = [
        Scenes.items.right_tick_1.set(656,21,19).hide(),
        Scenes.items.right_tick_2.set(716,21,19).hide(),
        Scenes.items.right_tick_3.set(779,21, 19).hide(),
        Scenes.items.right_tick_4.set(840,21, 19).hide(),
        Scenes.items.right_tick_5.set(898,21, 19).hide(),
      ]
      // graph option tabs
      let btns = [
        Scenes.items.option_1_tab_1,
        Scenes.items.option_1_tab_2,
        Scenes.items.option_1_tab_3,
        Scenes.items.option_1_tab_4,
        Scenes.items.option_1_tab_5,
      ]
      var st = {
        color: "black",
      }
      let phyTempText = Scenes.items.tempTitle40.set(643,385).styles(st).setContent("0")    
      let betaTempText = Scenes.items.tempTitle41.set(644,344).styles(st).setContent("0")  
      
      let vInValue = 0
      let dutyRatioValue = 0
      let resistanceValue = 0
      let inductanceValue = 0
      let isLoadAndInductanceSelected = false

      // ! onclick for load selecting buttons
      Scenes.items.part_3_option_1_load_1.item.onclick = ()=>{
        inductanceValue = 20
        resistanceValue = 100
        isLoadAndInductanceSelected = true
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        betaTempText.setContent(Formulas.r_l_load.betaDeg(values))
        phyTempText.setContent(Formulas.r_l_load.phy(values))

        Scenes.items.part_3_option_1_load_1.addClass("load-active")
        Scenes.items.part_3_option_1_load_2.addClass("load-deactive")
        Scenes.items.part_3_option_1_load_1.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_2.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_1.removeClass("btn-img")
        Scenes.items.part_3_option_1_load_2.removeClass("btn-img") 

        // * show blink arrow
        Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
        setCC("Press the 'Record' Button")
      }
      Scenes.items.part_3_option_1_load_2.item.onclick = ()=>{
        inductanceValue = 40
        resistanceValue = 50
        isLoadAndInductanceSelected = true
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        betaTempText.setContent(Formulas.r_l_load.betaDeg(values))
        phyTempText.setContent(Formulas.r_l_load.phy(values))

        Scenes.items.part_3_option_1_load_1.addClass("load-deactive")
        Scenes.items.part_3_option_1_load_2.addClass("load-active")
        Scenes.items.part_3_option_1_load_1.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_2.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_1.removeClass("btn-img")
        Scenes.items.part_3_option_1_load_2.removeClass("btn-img") 

        // * show blink arrow
        Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
        setCC("Press the 'Record' Button")
      }
      function resetLoadParameterStyling(){
        Scenes.items.part_3_option_1_load_1.removeClass("load-active")
        Scenes.items.part_3_option_1_load_2.removeClass("load-active")
        Scenes.items.part_3_option_1_load_1.removeClass("load-deactive")
        Scenes.items.part_3_option_1_load_2.removeClass("load-deactive")
      }
      resetLoadParameterStyling()
      let valuesToMatch = [] 

      let table = new Dom(".part3_table_three").item
      
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        
        Dom.setBlinkArrowRed(true,72,0,30, null,-90).play()
        setCC("Set AC input voltage, select load and vary the firing angle and record the observations.")

        // reset slider d onclick
        sliders.d.onclick = ()=>{}
        sliders.v_knob.onclick = ()=>{
          sliders.sliderV()
          sliders.v_knob.click()
          Dom.setBlinkArrowRed(true,505,-12,30,null,180).play()
          setCC("Select the load parameters")

          sliders.d.onclick = ()=>{
            // sliders.d.input()
            Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
            setCC("Press the 'Record' Button")
            // sliders.sliderD()
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // ! graph
      let graph_width = 346
      let graph_height = 239

      let graph_box_height = 239
      let graph_box_top = 90
      let dataLabelX = "Firing angle (𝜶°)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(null, graph_box_top, graph_box_height)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      // * showing the dummy graph
      function showDummyGraph(){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.set()
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_1,
            Scenes.items.graph_box_2,
            Scenes.items.graph_box_3, 
            Scenes.items.graph_box_4,
            Scenes.items.graph_box_5,
          ],
          graph: [
            Scenes.items.graph1.item,
            Scenes.items.graph2.item,
            Scenes.items.graph3.item,
            Scenes.items.graph4.item,
            Scenes.items.graph5.item,
          ]
        }
        let data = {
          labels: [
            "Vo",
            "Io",
            "Po",
            "PF",
            "THD",
          ],
          colors: [
            "#cc0505",
            "#7937aa",
            "#05bc57",
            "#05bcfe",
            "#d26315"  
          ],
          datas:[],
        }
        let yLabels = [
          "Output Voltage (Volts)",
          "Current (Amp)",
          "Output Power (Watts)",
          "Power Factor (PF)",
          "THD (%)",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [4,5,7,8,10,11]
          let indexForTableColumnDataX = 2
          indexForTableColunmDataY.forEach(col_idx=>{
            let datas = []
            let rows = table.tBodies[0].rows
            // get data from rows.cells
            for(let row of rows){
              let x = row.cells[indexForTableColumnDataX].innerHTML
              let y = row.cells[col_idx].innerHTML
              let data = {x,y}
              datas.push(data);
            }
            // save data on datas_XY
            datas_XY.push(datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            idx = idx
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArray = data.datas[idx],
            dataLabel = data.labels[idx],
            dataColor = data.colors[idx]
            // plot empty graph
            let graphRef = Scenes.plotGraph(ctx,idx,true,xLabel,yLabel)

            // plot empty first then add data
            Scenes.graphFeatures.addDataset(graphRef,dataLabel,dataColor,dataArray)
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        } 
        dataToGraphConversion()

        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              // todo 
              for(let i in btns){
                btns[i].opacity(1)
                rightTicks[i].opacity(1)
              }
              Dom.setBlinkArrowRed(-1)
              setTimeout(() => {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 544).play();
                setIsProcessRunning(false);
                Scenes.currentStep = 8
              }, 12000);
              // showArrowForAll()
              setCC("In AC voltage controller the waveform distortion is more at higher firing angles and thus THD is high.")
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,709,90,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,772,90,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,834,90,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,894,90,30,null,90).play(),
            ],
            texts: [
              "Here, the load voltage decreases with increasing firing angle",
              "Here, the load and SCR current decreases with increasing firing angle.",
              "Here, both the load voltage and power demand are controlled by the AC voltage controller.",
              "In AC voltage controller the power factor decreases with increasing firing angle"
            ]
          }

          btns.forEach((btn,idx)=>{

            btn.item.onclick = () =>{
                //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){
                case 0: 
                  conclusionFront = "The load voltage decreases with increasing firing angle."
                  break;
                
                case 1: 
                  conclusionFront = "The load current and current through SCR decreases with increasing firing angle."
                  break;
                
                case 2: 
                  conclusionFront = "As load voltage and current decreases with increasing firing angle, the load power can easily be controlled by changing the firing angle."
                  break;
                
                case 3: 
                  conclusionFront = "Power factor decreases with increasing firing angle. "
                  break;
                  
                case 4: 
                  conclusionFront = "As waveform distortion increases with increasing firing angle, the THD also increases."
                  break;
              }
              Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }
              if(isRunning){
                for(let i in btns){
                  btns[i].opacity(0.4)
                  rightTicks[i].opacity(0.4)
                }
              }
              btn.opacity(1)

              // * show current clicked graph and labels
              ctxs.graph_box[idx].set(null, graph_box_top, graph_box_height)
              // showing right tick
              rightTicks[idx].set()
              if(idx < btns.length - graphIdx - 1){
                subtitles.arrows[idx]()
                setCC(subtitles.texts[idx])
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)
            }
          })
        }
        btnGraphTab()
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(null, -74,108, 301 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 11
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          // disableSlider("reset")
        }
        valuesToMatch.pop()
        // for safe the prdefined values
        if(recordBtnClickIdx==0){
          rows[0].cells[2].innerHTML = 0
          // valuesToMatch.push(0)
        }else if(recordBtnClickIdx==1){
          rows[1].cells[2].innerHTML = 170
          // valuesToMatch.push(170)
        }
      }

      //! onclick for reset 
      Scenes.items.btn_reset_part_3.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=11
  
        for(let btn of btns){
          btn.item.onclick = ()=>{}
        }
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }
        rows[0].cells[2].innerHTML = 0
        rows[1].cells[2].innerHTML = 170
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()

        // reset load parameters
        resetLoadParameterStyling()
        Scenes.steps[9]()
      }

      let currentTableIdx = 0
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        if(!isLoadAndInductanceSelected){
          Dom.setBlinkArrowRed(true,505,-12,30,null,180).play()
          setCC("Select the load parameters")
          return  
        }
        // for arrow system
         if(recordBtnClickIdx > 0 && recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,312,115,null,null,90).play()
            setCC("Change the value of firing angle")
            
            sliders.d.oninput = (e)=>{
              // sliders.d.input()
              // Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
              // setCC("Press the 'Record' Button")
              
              let slider_D = document.querySelector(".slider_D")
              let sliderImg = document.querySelector(".slider-D-arrow")
              let sliderValueInput = document.querySelector(".d .value-box input")
              let val = 0
              
              // slider function  
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
                  console.log("step:",Scenes.currentStep)
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
            }
        }else if(recordBtnClickIdx == 6){
          Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
          setCC("Press the 'Record' Button")
        }
        // dutyRatioValue/d is firing angle
        vInValue = Number(sliders.v.value)
        dutyRatioValue = Number(sliders.d.value)
        // * for default two values
        if(recordBtnClickIdx == 0 || recordBtnClickIdx == 1){
          dutyRatioValue = recordBtnClickIdx==0 ? 0:170
        }
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different firing angle.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            let valueColumnToShort = 2
            
            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
              rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            Dom.setBlinkArrowRed(true,647,90,30,null,90).play()
            setCC("Plot output voltage variation with firing angle characteristics")
            // refer to plotGraphs() area
          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disable sliders
        }
        if(recordBtnClickIdx == 7){
          return
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = FiringAngleValue==""?dutyRatioValue:FiringAngleValue
        tableRow.cells[3].innerHTML = resistanceValue
        tableRow.cells[4].innerHTML = Number(Formulas.r_load.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.r_load.i0(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.r_load.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.r_load.p0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.r_load.pf(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.r_load.v01(values)).toFixed(2)
        tableRow.cells[10].innerHTML = Number(Formulas.r_load.THD(values)).toFixed(2)
        // added a display none column
        // tableRow.cells[11].innerHTML = Number(Formulas.r_load.iSCR(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        // if(recordBtnClickIdx==7){
        //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
        // }
      }    

      return true;

    }),

    //! semi controlled
    (step9 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      );
      // ! show the slider
      Scenes.items.slider_box.set(0,-50).show("flex")
      sliders.showAllSliders()
      sliders.resetSlidersValue()
      // setCC("Record  7 reading for different Duty Ratio.")
      
      // ! required item
      // circuit full 3 replaced by 2 because of changes
      // Scenes.items.circuit_full_2.set(230,-50,175)
      // Scenes.items.part_3_option_1.set(10, 170-15)
      // Scenes.items.right_tick_1.set(-12,185-15)
      // Scenes.items.graph1_arrow.set(-5,6)

      // Scenes.items.part3_table_one.set(10).show("flex")

      //!new added for EE12
      new Dom(".slider-circuit-helper").hide()
      Scenes.items.part3_table_three_two.set(10)
      Scenes.items.part_3_option_1_alpha_val.set(610, 377, 35)
      Scenes.items.part_3_option_1_beta_val.set(610, 337, 35)
      Scenes.items.part_3_option_1_load_1.set(550, -74, 70)
      Scenes.items.part_3_option_1_load_2.set(552, 0, 70)
      Scenes.items.part_3_option_2_alpha_vs.set(704, -60, 80)
      Scenes.items.option_2_tab_1.set(876-180+10, 12, 75).opacity(0.4)
      Scenes.items.option_2_tab_2.set(876-120+10, 12, 75).opacity(0.4)
      Scenes.items.option_2_tab_3.set(876-60+10, 12, 75).opacity(0.4)

      Scenes .items.option_1_circuit_upper_part.set(260, 4, 37, 174).zIndex(2002)
      Scenes .items.helper.set(263, 0, 36, 160).zIndex(2000)

      Scenes.items.btn_record.set(764, 335, 80)
      Scenes.items.btn_reset_part_3.set(843 + 10, 368+8, 40)
      Scenes.items.btn_delete.set(843 + 10, 368+8-50+8, 40)


      let rightTicks = [
        Scenes.items.right_tick_2.set(716,21,19).hide(),
        Scenes.items.right_tick_3.set(779,21, 19).hide(),
        Scenes.items.right_tick_4.set(840,21, 19).hide(),
      ]
      // graph option tabs
      let btns = [
        Scenes.items.option_2_tab_1,
        Scenes.items.option_2_tab_2,
        Scenes.items.option_2_tab_3
      ]
      var st = {
        color: "black",
      }
      let phyTempText = Scenes.items.tempTitle40.set(643,385).styles(st).setContent("0")    
      let betaTempText = Scenes.items.tempTitle41.set(644,344).styles(st).setContent("0")  

      let vInValue = 0
      let dutyRatioValue = 0
      let resistanceValue = 0
      let inductanceValue = 0
      let isLoadAndInductanceSelected = false

      // ! onclick for load selecting buttons
      Scenes.items.part_3_option_1_load_1.item.onclick = ()=>{
        resistanceValue = 100
        inductanceValue = 20
        isLoadAndInductanceSelected = true
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        betaTempText.setContent(Formulas.r_l_load.betaDeg(values))
        phyTempText.setContent(Formulas.r_l_load.phy(values))

        Scenes.items.part_3_option_1_load_1.addClass("load-active")
        Scenes.items.part_3_option_1_load_2.addClass("load-deactive")
        Scenes.items.part_3_option_1_load_1.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_2.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_1.removeClass("btn-img")
        Scenes.items.part_3_option_1_load_2.removeClass("btn-img") 

        // * show blink arrow
        Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
        setCC("Press the 'Record' Button")
      }
      Scenes.items.part_3_option_1_load_2.item.onclick = ()=>{
        resistanceValue = 50
        inductanceValue = 40
        isLoadAndInductanceSelected = true
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)
        betaTempText.setContent(Formulas.r_l_load.betaDeg(values))
        phyTempText.setContent(Formulas.r_l_load.phy(values))

        Scenes.items.part_3_option_1_load_1.addClass("load-deactive")
        Scenes.items.part_3_option_1_load_2.addClass("load-active")
        Scenes.items.part_3_option_1_load_1.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_2.item.onclick = ()=>{}
        Scenes.items.part_3_option_1_load_1.removeClass("btn-img")
        Scenes.items.part_3_option_1_load_2.removeClass("btn-img") 

        // * show blink arrow
        Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
        setCC("Press the 'Record' Button")
      }
      function resetLoadParameterStyling(){
        Scenes.items.part_3_option_1_load_1.removeClass("load-active")
        Scenes.items.part_3_option_1_load_2.removeClass("load-active")
        Scenes.items.part_3_option_1_load_1.removeClass("load-deactive")
        Scenes.items.part_3_option_1_load_2.removeClass("load-deactive")
      }
      resetLoadParameterStyling()
      // Scenes.items.btn_record.set(610,365,60)
      // Scenes.items.btn_delete.set(730,365)
      // Scenes.items.btn_reset.set(820,365)
      let valuesToMatch = [] 

      let table = new Dom(".part3_table_three_two").item
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        
        Dom.setBlinkArrowRed(true,72,0,30, null,-90).play()
        setCC("Set AC input voltage, select load and vary the firing angle and record the observations.")

        // reset slider d onclick
        sliders.d.onclick = ()=>{}
        sliders.v_knob.onclick = ()=>{
          sliders.sliderV()
          sliders.v_knob.click()
          Dom.setBlinkArrowRed(true,505,-12,30,null,180).play()
          setCC("Select the load parameters")

          sliders.d.onclick = ()=>{
            // sliders.d.input()
            Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
            setCC("Press the 'Record' Button")
            // sliders.sliderD()
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // ! graph
      let graph_width = 346
      let graph_height = 239

      let graph_box_height = 239
      let graph_box_top = 90
      let dataLabelX = "Firing angle (𝜶°)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(null, graph_box_top, graph_box_height)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 5
      // * showing the dummy graph
      function showDummyGraph(){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.set()
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_6,
            Scenes.items.graph_box_7,
            Scenes.items.graph_box_8,
          ],
          graph: [
            Scenes.items.graph6.item,
            Scenes.items.graph7.item,
            Scenes.items.graph8.item,
          ]
        }
        let data = {
          labels: [
            "Vo",
            "Io",
            "vDC",
          ],
          colors: [
            "#cc0505",
            "#7937aa",
            "#05bc57",
          ],
          datas:[],
        }
        let yLabels = [
          "RMS Output Voltage (V<sub>0</sub>)",
          "RMS Current (I<sub>0</sub>)",
          "DC Output Voltage (V<sub>0</sub>)",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [3,5,4]
          let indexForTableColumnDataX = 2
          indexForTableColunmDataY.forEach(col_idx=>{
            let datas = []
            let rows = table.tBodies[0].rows
            // get data from rows.cells
            for(let row of rows){
              let x = row.cells[indexForTableColumnDataX].innerHTML
              let y = row.cells[col_idx].innerHTML
              let data = {x,y}
              datas.push(data);
            }
            // save data on datas_XY
            datas_XY.push(datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArray = data.datas[idx],
            dataLabel = data.labels[idx],
            dataColor = data.colors[idx]

            // plot empty first then add data
            let graphRef = Scenes.plotGraph(ctx,graphIdx + idx,true,xLabel,yLabel)
            
            // plot empty first then add data
            Scenes.graphFeatures.addDataset(graphRef,dataLabel,dataColor,dataArray)
            // ctxs.graph_box[idx].set()
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()

        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              // todo 
              for(let i in btns){
                btns[i].opacity(1)
                rightTicks[i].opacity(1)
              }
              Dom.setBlinkArrowRed(-1)
              setTimeout(() => {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 544).play();
                setIsProcessRunning(false);
                Scenes.currentStep = 11
              }, 12000);
              // showArrowForAll()
              setCC("The DC-offset in the load voltage incarease with an increase in firing angle.")
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,772,90,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,834,90,30,null,90).play(),
            ],
            texts: [
              "The RMS load voltage decreases with an increase in firing angle. Since no control of firing angle in the negative half cycle, lower load voltages are not realizable even at higher firing angles.",
              "The RMS load current decreases with an increase in firing angle .",
            ]
          }

          btns.forEach((btn,idx)=>{
            btn.item.onclick = () =>{
              //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){
                case 0: 
                  conclusionFront = "The load current and current through SCR decreases with increasing firing angle."
                  break;
                
                case 1: 
                  conclusionFront = "As load voltage and current decreases with increasing firing angle, the load power can easily be controlled by changing the firing angle."
                  break;
                
                case 2: 
                  conclusionFront = "Power factor decreases with increasing firing angle. "
                  break;
              }
              // it is not required
              // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }
              if(isRunning){
                for(let i in btns){
                  btns[i].opacity(0.4)
                  rightTicks[i].opacity(0.4)
                }
              }
              btn.opacity(1)

              // * show current clicked graph and labels
              ctxs.graph_box[idx].set(null, graph_box_top, graph_box_height)
              // showing right tick
              rightTicks[idx].set()
              if(idx < btns.length - 1){
                subtitles.arrows[idx]()
                setCC(subtitles.texts[idx])
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx+graphIdx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)
            }
          })
        }
        btnGraphTab()
      }


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 7
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          // disableSlider("reset")
        }
        valuesToMatch.pop()
        // for safe the prdefined values
        if(recordBtnClickIdx==0){
          rows[0].cells[2].innerHTML = 0
          valuesToMatch.push(0)
        }else if(recordBtnClickIdx==1){
          rows[1].cells[2].innerHTML = 170
          valuesToMatch.push(170)
        }
      }

      //! onclick for reset 
      Scenes.items.btn_reset_part_3.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=7

        for(let btn of btns){
          btn.item.onclick = ()=>{}
        }
        
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }
        rows[0].cells[2].innerHTML = 0
        rows[1].cells[2].innerHTML = 170
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()

        // reset load parameters
        resetLoadParameterStyling()

        isLoadAndInductanceSelected = false
        Scenes.steps[10]()
      }
      sliders.d.oninput = (e)=>{
        // sliders.d.input()
        // Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
        // setCC("Press the 'Record' Button")
        
        let slider_D = document.querySelector(".slider_D")
        let sliderImg = document.querySelector(".slider-D-arrow")
        let sliderValueInput = document.querySelector(".d .value-box input")
        let val = 0
        
        // slider function  
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
            console.log("step:",Scenes.currentStep)
            let betaTempText = Scenes.items.tempTitle41
            let first = 363.6
            let second = 374.1
            let load_1 = 100
            let betaDeg = (values.R == load_1 ? first : second)
            if(slider_D.value <= 30){
                betaDeg = 360
            }
            betaTempText.setContent(betaDeg)
        }
      }
      let currentTableIdx = 0 
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        if(!isLoadAndInductanceSelected){
          Dom.setBlinkArrowRed(true,505,-12,30,null,180).play()
          setCC("Select the load parameters")
          return  
        }
        // for arrow system
         if(recordBtnClickIdx > 0 && recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,312,115,null,null,90).play()
            setCC("Change the value of firing angle")
            
            sliders.d.oninput = (e)=>{
              // sliders.d.input()
              // Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
              // setCC("Press the 'Record' Button")
              
              let slider_D = document.querySelector(".slider_D")
              let sliderImg = document.querySelector(".slider-D-arrow")
              let sliderValueInput = document.querySelector(".d .value-box input")
              let val = 0
              
              // slider function  
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
                  console.log("step:",Scenes.currentStep)
                  let betaTempText = Scenes.items.tempTitle41
                  let first = 363.6
                  let second = 374.1
                  let load_1 = 100
                  let betaDeg = (values.R == load_1 ? first : second)
                  if(slider_D.value <= 30){
                      betaDeg = 360
                  }
                  betaTempText.setContent(betaDeg)
              }
            }

          }else if(recordBtnClickIdx == 6){
          Dom.setBlinkArrowRed(true,788,300,null,null,-90).play()
          setCC("Press the 'Record' Button")
        }
        // dutyRatioValue/d is firing angle
        vInValue = Number(sliders.v.value)
        dutyRatioValue = Number(sliders.d.value)
        // * for default two values
        if(recordBtnClickIdx == 0 || recordBtnClickIdx == 1){
        dutyRatioValue = recordBtnClickIdx==0 ? 0:170
        }
        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue)

        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different firing angle.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            let valueColumnToShort = 2
            
            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            Dom.setBlinkArrowRed(true,709,90,30,null,90).play()
            setCC("Plot output voltage variation with firing angle characteristics")
            // refer to plotGraphs() area
          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = FiringAngleValue==""?dutyRatioValue:FiringAngleValue
        tableRow.cells[3].innerHTML = Number(Formulas.r_l_load.v0(values)).toFixed(2)
        tableRow.cells[4].innerHTML = Number(Formulas.r_l_load.vDC(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.r_l_load.i0(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.r_l_load.iIn(values)).toFixed(2)
      

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})
        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        // if(recordBtnClickIdx==7){
        //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
        // }
      }    
      return true;
    }),
    //! Application 
    (step10 = function () {
      setIsProcessRunning(true);
      // to hide previous step

     //! Required Items
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.item.style.scale = "1.1";
      Scenes.items.slider_box.show("flex").set(132, 187);
      sliders.showSlider('d')
      sliders.resetSlidersValue()
      Scenes.items.part_4_circuit.set(10, 125, 288).zIndex(1)
      Scenes.items.part_4_heading.set(24, -37, 60)
      // Scenes.items.btn_manual.set(144, 19, 45)
      // Scenes.items.btn_auto.set(24, 19, 45)
      Scenes.items.part_4_fan.set(816, 155, 92).zIndex(2)

      Dom.setBlinkArrowRed(true, 349, 338,30,null,180).play();

      
      // setCC("Here an example application of AC voltage controller is demonstrated for speed control of fan. Using the firing angle control the speed of fan can easily be changed as per the requirement.").onend = ()=>{
      //   setCC("For better understanding of AC voltage controller power control use manual adjustment of firing angle.").onend = ()=>{
      //     setCC("Click on Manual and change the firing angle.").onend = ()=>{
      //       Dom.setBlinkArrowRed(true,180,70,30,null,90).play()
      //     }
      //   }
      // }
      
      setCC("Here an example application of AC voltage controller is demonstrated for speed control of fan.")
      setCC("Using the firing angle control the speed of fan can easily be changed as per the requirement.")
      sliders.d.onclick = ()=>{}

      let slider_circuit = new Dom(".slider-circuit-helper").set(70.6,56,105,151)

      // speed is time (duration)
      let animeFanRotatingObj = null
      let rotateFan = {
        angle: 0
      }
      let sliderValue = {
        value: 0
      }
      let localAngle = 0
      const animeFanRotating = (duration)=>{
        if(animeFanRotatingObj!=null){
          animeFanRotatingObj.reset()
          // localAngle = rotateFan.angle
        }
        animeFanRotatingObj = anime({
          targets: rotateFan,
          angle: 360,
          // angle: [localAngle, 360],
          easing: "linear",
          duration: duration,
          loop: true,
          update(){
            Scenes.items.part_4_fan.rotate(rotateFan.angle)
            // localAngle = rotateFan.angle
          },
          complete(){
            rotateFan.angle = 0
          }
        })
        // rotateFan.angle = localAngle

      }
      // default speed
      animeFanRotating(500)

      // ! Calculation function
      let min = 500
      let max = 4000
      let maxAngle = 180
      let diff = max - min
      let diffAngle = diff / maxAngle
      let generatingValue = (sliderValue)=>{
          // * Generating a function that take value and return the value acordingly
          // 1 get range like 500 to 4000, and func range 0 to 180
          // 2 minus the max value my min 4000 - 500 = 3500
          // 3 devide the ans with max func value 3500 / 180 = 19.45
          // 4 create func (min + (devideAns * currValue )
          // 500 + (19.45 * sliderValue)


          let timeSpeed = min + (diffAngle * sliderValue)
          animeFanRotating(timeSpeed)
          return timeSpeed
      }
      let animeSliderAuto = anime({
        targets: sliderValue,
        value: 180,
        easing: "linear",
        duration: 5000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
        update(){
          sliders.d.value = sliderValue.value
          // * for slider assistance
          let slider_D = document.querySelector(".slider_D")
          let sliderImg = document.querySelector(".slider-D-arrow")
          let sliderValueInput = document.querySelector(".d .value-box input")
          let val = 0

          sliderValueInput.value = slider_D.value 
          val = ((slider_D.value * 95) / 109) - 7
          sliderImg.style.left = `${102.5 + val}px`
          sliderValue.value = val

          generatingValue(sliderValue.value)
        },
      })
      // animeSliderAuto.play()
      Scenes.items.btn_auto.item.onclick = ()=>{
        animeSliderAuto.play()
      }
      let simulationDone = false
      Scenes.items.btn_manual.item.onclick = ()=>{
        if(animeSliderAuto!=null){
          animeSliderAuto.pause()
        }
        // sliders.d.oninput = ()=>{
        //   let slider_D = document.querySelector(".slider_D")
        //   let sliderImg = document.querySelector(".slider-D-arrow")
        //   let sliderValueInput = document.querySelector(".d .value-box input")
        //   let val = 0

        //   sliderValueInput.value = slider_D.value 
        //   val = ((slider_D.value * 95) / 109) - 7
        //   sliderImg.style.left = `${102.5 + val}px`
        //   console.log(sliders.d.value, generatingValue(sliders.d.value))
        // }
        
        sliders.d.onchange = ()=>{
          generatingValue(sliders.d.value)
          if(!simulationDone){
            setCC("Simulation Done")
            Dom.setBlinkArrowRed(-1)
            simulationDone = true
          }
        }
      }
      Scenes.items.btn_manual.item.click()
      return true
    }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        if(this.currentStep==2 || this.currentStep >= 6){
          
          nextDrawerItem();
          nextProgressBar();
        }
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// stepcalling
Scenes.currentStep = 2
Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next")

const backBtn = get(".btn-back")
nextBtn.addEventListener("click", () => {
  Scenes.next();
})
backBtn.addEventListener("click", () => {
  Scenes.back();
})

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }























