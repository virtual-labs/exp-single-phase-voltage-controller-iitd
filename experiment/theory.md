### Theory

**1) Fully controlled AC Voltage controller with R-L Load**

The circuit configuration of fully controlled AC voltage controller is given in Fig. 1.

<center>
  <img src="images/th1.png" height="350px">
  
Fig. 1. Circuit configuration of AC voltage controller.

</center>
<br>
The principle of operation of the above circuit can easily be understood from the waveforms given in Fig. 2.
<br>

<center>
  <img src="images/th2.png" height="900px">
  
<br>Fig. 2. Typical waveforms with R-L load (α<90&#176;).

</center>

<div style="float: left; width:100%;"><br>
Voltage appearing across load is defined by
<br><br>
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th3.png" height="76px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br>

<div style="float: left; width:100%;"><br>
Applying Kirchhoff’s voltage law
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th4.png" height="76px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)

</div>

<div style="float: left; width:100%;"><br>
Solving the above equation
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th5.png" height="102px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>


<div style="float: left; width:100%;"><br>
where
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th6.png" height="48px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(4)

</div>

<div style="float: left; width:100%;"><br>
  
and
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th7.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(5)

</div>
<br>

<div style="float: left; width:100%;"><br>
  
Let
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th8.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    &nbsp;

</div>
<br>

<div style="float: left; width:100%;"><br>
For the given firing angle and R-L load parameters, the extinction angle is obtained by solving the equation given below.
<br><br>
</div>


<div style="float: left; width:50%;">
  <img src="images/th9.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(6)

</div>

<div style="float: left; width:100%;">
and conduction angle
</div>

<div style="float: left; width:50%;">
  <img src="images/th10.png" height="42px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(7)

</div>
<br>
<div style="float: left; width:100%;">
The condition to get controlled output is
</div>

<div style="float: left; width:50%;">
  <img src="images/th11.png" height="42px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(8)

</div>
<br>

<div style="float: left; width:100%;">
otherwise the load voltage will be same as the input voltage.
<br><br>
The fundamental component of load voltage can easily be obtained from the Fourier coefficients and it is given below.
</div>

<div style="float: left; width:50%;">
  <img src="images/th12.png" height="80px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(9)

</div>
<br>
<br>
<div style="float: left; width:100%;">
where
</div>

<div style="float: left; width:50%;">
  <img src="images/th13.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(10)

</div>
<br>
<br>
<div style="float: left; width:100%;">
and
</div>

<div style="float: left; width:50%;">
  <img src="images/th14.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(11)

</div>
<br>
<br>
<div style="float: left; width:100%;">
Total harmonic distortion (THD) in the load voltage is given by
</div>

<div style="float: left; width:50%;">
  <img src="images/th15.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(12)

</div>
<br>

<br>
<div style="float: left; width:100%;">

**2) Asymmetrical or Semi-controlled AC Voltage controller with R-L Load**

The circuit configuration of semi-controlled AC voltage controller is given in Fig. 3.
</div>

<center>
  <img src="images/th16.png" height="360px">
  
Fig. 3. Circuit configuration of semi-controlled AC voltage controller.

</center>
<br>

<br>
<div style="float: left; width:100%;">

The corresponding waveforms are given in Fig. 4.

</div>

<center>
  <img src="images/th17.png" height="900px">
  
Fig. 3. Typical waveforms with R-load (α<90&#176;).

</center>
<br>

<br>
<div style="float: left; width:100%;">
Let the source voltage be
</div>

<div style="float: left; width:50%;">
  <img src="images/th18.png" height="45px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(13)

</div>
<br>

<br>
<div style="float: left; width:100%;">
Then the load voltage is
</div>

<div style="float: left; width:50%;">
  <img src="images/th19.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(14)

</div>

<br>
<div style="float: left; width:100%;">
Hence the RMS value of load voltage is:
</div>

<div style="float: left; width:50%;">
  <img src="images/th20.png" height="78px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(15)

</div>

<br>
<div style="float: left; width:100%;">
and RMS load current is given by 
</div>

<div style="float: left; width:50%;">
  <img src="images/th21.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(16)

</div>

<br>
<div style="float: left; width:100%;">
Since the output voltage is not identical in positive and negative half cycle, the output voltage waveform exhibits DC-offset which is given by
</div>

<div style="float: left; width:50%;">
  <img src="images/th22.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(17)

</div>
