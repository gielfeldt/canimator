p=["1k JS demo","By Gielfeldt","Never gonna give you up"]
z=requestAnimationFrame,o=1,l=0,i=0,y=500,aw=a.width,ah=a.height,h=c.createLinearGradient(0,0,aw,ah)
c.font="2em verdana"
h.addColorStop(0,"red")
h.addColorStop(0.5,"#0F0")
h.addColorStop(1,"#00F")
q=function(){a.style.background="rgba(0,0,0,"+(1-o)+")"
q=(o-=0.01)>0?q:function(){c.clearRect(0,0,aw,ah)
s=i%y,l=(i/y|0)%3,w=(ah/y/2)*s+ah/4
c.globalAlpha=s<y*0.75?s/(y/4):(y-s)/(y/4)
c.fillStyle=h
c.setTransform(1,s/y,s/y,1,-aw/2,-ah/2)
c.fillRect(0,0,aw,ah)
c.setTransform(1,0,0,(s>y/3)&&(s<y/2)?Math.random()*1.1+1:1,0,0)
c.fillStyle="#FFF"
c.fillText(p[l],50+aw/2*(l%2),(l%2?ah-w:w))
i++}},r=function(){q();z(r)}
z(r)
s=function(f){return eval("for(var t=0,S='RIFF_oO_WAVEfmt "+atob('EAAAAAEAAQBAHwAAQB8AAAEACAA')+"data';++t<3e5;)S+=String.fromCharCode("+f+")")},f = "(t<<3)*[8/9,1,9/8,6/5,4/3,3/2,0][[0xd2d2c8,0xce4088,0xca32c8,0x8e4009][t>>14&3]>>(0x3dbe4688>>((t>>10&15)>9?18:t>>10&15)*3&7)*3&7]&255";
m=new Audio('data:audio/wav;base64,'+btoa(s(f)))
m.play()