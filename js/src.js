function demoFromHTML()
{
    var pdf= new jsPDF('p', 'pt', 'letter');
    source= $('#content')[0];
    specialElementHandlers={
        '#bypassme':function(element,renderer)
        {
            return true
        }
    };
    margins={
        top: 80,
        bottom:60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
        source,
        margins.left,
        margins.top,
        {'width': margins.width,
        'elementHandlers': specialElementHandlers},
        function (dispose){
            pdf.save('Test.pdf');
        },
        margins
    );

}
(function () {


function Input(el)
{
    this.el=el;
    this.er=0;

}
Input.prototype.shownumber= function()
{
    for(var i=0; i<this.el.name.length; i++) {
        var show = document.getElementById(this.el.name[i]);
        var reg = new RegExp(this.el.regexp[i]);
        if (reg.test(show.value)) {
            show.style.border= "1px solid #6D6A7A";

        }
        else {
            this.displayError(show,this.el.ErrorMsg[i]);
            this.er++;
        }
    }

};
Input.prototype.displayError= function(name, error)
    {

      name.style.border= "1px solid #C90B07";
      var div= document.getElementById("ipt-"+name.id);
      var errordiv= document.createElement("div");
      errordiv.classList.add("ErrorDiv");
      errordiv.innerHTML="<h3>"+error+"</h3>";
      div.insertBefore(errordiv,name[0]);
      console.log(this.er);



    };

Input.prototype.removeElement= function()
{
    var edv= document.getElementsByClassName("ErrorDiv");

    if(this.er>0 && edv!==undefined)
    {
        for(let x=0; x<edv.length; x++) {


            edv[x].style.display = "none";
            edv[x].parentNode.removeChild(edv[x]);
        }

    }

};
Input.prototype.display= function()
{
var that= this;
this.button= document.getElementById('btn');
this.button.addEventListener('click',function(){
    that.removeElement();
    that.shownumber();



}, false)

};

var namesv= new Input({name: ['number','Name'],
    ErrorMsg:["To pole  przyjmuje tylko liczby i ukośnik ",""],
    regexp:["^[\\d/]+$",""]});

namesv.display()
})(jQuery);


