/*
	code for generating map and interactive functionality and numbers
*/


var demtoggle = 0;
var reptoggle = 0;
var islandtoggle = 0;
function toggle(p)
{	
	if(p == "dem"){
		if(demtoggle == 0)
		{
			d3.select(".counties").selectAll("path.q0-9").attr("class","gopwhite"); 
			demtoggle = 1;
		}
		else
		{
			d3.select(".counties").selectAll("path.gopwhite").attr("class","q0-9"); 
			demtoggle = 0;
		}
	}
	if(p == "gop"){	
		if(reptoggle == 0)
		{
			d3.select(".counties").selectAll("path.q8-9").attr("class","demwhite"); 
			d3.select(".counties").selectAll("path.island").attr("class","demwhiteisland"); 
			reptoggle = 1;
		}
		else
		{
			d3.select(".counties").selectAll("path.demwhite").attr("class","q8-9"); 
			d3.select(".counties").selectAll("path.demwhiteisland").attr("class","island"); 
			reptoggle = 0;
		}
	}	 
        if(p == "isle")
	{
		  if(islandtoggle == 0)
		  {
			 d3.select(".counties").selectAll("path.q8-9").attr("class","demwhite");
			 d3.select(".counties").selectAll("path.q0-9").attr("class","gopwhite");
			 islandtoggle = 1;
			 d3.select(".counties").selectAll("path[title1='island']").attr("class","q8-9");
		  }
		  else
		  {
			 d3.select(".counties").selectAll("path.gopwhite").attr("class","q0-9");
			 d3.select(".counties").selectAll("path.demwhite").attr("class","q8-9");
			 islandtoggle = 0;
		  }
	}
}

var currentfip = 0;
var currentcolor = "blue";
function highlight(fip,tocolor)
{
	t = d3.select(".counties").selectAll("path[fip='"+fip+"']");
	if(fip != currentfip)
	{
		//reset old link and map
		if(currentfip != 0){
			if(currentcolor == "blue") clscolor = "q8-9";
			else clscolor = "q0-9";

			$("#"+currentfip+" a").css("color","black");
			d3.select(".counties").selectAll("path[fip='"+currentfip+"']").attr("class",clscolor);
		}
		
		//select new link and map
		$("#"+fip+" a").css("color","blue");
		t.attr("class","yellow");
		currentcolor = tocolor;
	}
	else
	{
		//we are reselecting existing one so toggle link/map
		curcolor = $("#"+currentfip+" a").css("color");
		newcolor = "blue";
		if(curcolor == "blue") newcolor = "black";
		curcolor = $("#"+currentfip+" a").css("color",newcolor);

		if(tocolor == "blue") newmapcolor = "q8-9";
		else newmapcolor = "q0-9";
		if(t.attr("class") == newmapcolor) newmapcolor = "yellow";
		t.attr("class",newmapcolor);
	}
	display_county_info(fip);
	currentfip = fip;
}

var harddemtoggle = 0;
var hardgoptoggle = 0;
function hardcore(p)
{	
	if(p == "dem"){
		if(harddemtoggle == 0)
		{
			d3.select(".counties").selectAll("path.q8-9").attr("class","demwhite");
			d3.select(".counties").selectAll("path.q0-9").attr("class","gopwhite");
			harddemtoggle = 1;
			d3.select(".counties").selectAll("path[title='hardcoredemocrat']").attr("class","q8-9"); 
		}
		else
		{
			d3.select(".counties").selectAll("path.gopwhite").attr("class","q0-9"); 
			d3.select(".counties").selectAll("path.demwhite").attr("class","q8-9"); 
			harddemtoggle = 0;
		}
	}
	else{
		if(hardgoptoggle == 0)
		{
			d3.select(".counties").selectAll("path.q8-9").attr("class","demwhite");
			d3.select(".counties").selectAll("path.q0-9").attr("class","gopwhite");
			hardgoptoggle = 1;
			d3.select(".counties").selectAll("path[title='hardcorerepublican']").attr("class","q0-9"); 
		}
		else
		{
			d3.select(".counties").selectAll("path.gopwhite").attr("class","q0-9"); 
			d3.select(".counties").selectAll("path.demwhite").attr("class","q8-9"); 
			hardgoptoggle = 0;
		}
	}
}

var highestdemtoggle = 0;
var highestgoptoggle = 0;
function highest(p)
{	
	if(p == "dem"){
		if(highestdemtoggle == 0)
		{
			d3.select(".counties").selectAll("path.q8-9").attr("class","demwhite");
			d3.select(".counties").selectAll("path.q0-9").attr("class","gopwhite");
			highestdemtoggle = 1;
			d3.select(".counties").selectAll("path[title='highestdemocrat']").attr("class","q8-9"); 
		}
		else
		{
			d3.select(".counties").selectAll("path.gopwhite").attr("class","q0-9"); 
			d3.select(".counties").selectAll("path.demwhite").attr("class","q8-9"); 
			highestdemtoggle = 0;
		}
	}
	else{
		if(highestgoptoggle == 0)
		{
			d3.select(".counties").selectAll("path.q8-9").attr("class","demwhite");
			d3.select(".counties").selectAll("path.q0-9").attr("class","gopwhite");
			highestgoptoggle = 1;
			d3.select(".counties").selectAll("path[title='highestrepublican']").attr("class","q0-9"); 
		}
		else
		{
			d3.select(".counties").selectAll("path.gopwhite").attr("class","q0-9"); 
			d3.select(".counties").selectAll("path.demwhite").attr("class","q8-9"); 
			highestgoptoggle = 0;
		}
	}
}

//TODO: make map bigger if user has big enough screen
//set for 1440 x 900 now ( 1.6 ratio )
// adapt for 1024 by 600 ( 1.71 ratio)

//works best on 1440 by 779 ( 1.848 ratio)
var width = 880, height = 500;  //ratio 1.76

var initialwindow_width = jQuery(window).width();
var initialwindow_height = jQuery(window).height();

var scalesize = 970;
if(initialwindow_height < 779)
{
	//TODO
	//bring up statement div
	//currenttop = 500 - (.5 * ( 779 - initialwindow_height) );
	//if(initialwindow_height > 600){currenttop = 500 - (.5 * ( 779 - initialwindow_height) );}
	if(initialwindow_height > 600){currenttop = 445 - (.5 * ( 779 - initialwindow_height) );}
	else{ currenttop = 400;}
	jQuery(".statement").css("top",currenttop+"px");	

	//make mapitself smaller
	//width = 704, height = 400; 
	scalesize = 20 + (scalesize * (initialwindow_height / 779));

}

console.log("width,height = "+initialwindow_width + ", "+initialwindow_height);
console.log("ratio= "+initialwindow_width / initialwindow_height);

var rateById = d3.map();
var quantize = d3.scale.quantize() .domain([0, .15]) .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var projection = d3.geo.albersUsa().scale(scalesize) .translate([width / 2, height / 2]);
//var projection = d3.geo.albersUsa() .scale(1070) .translate([width / 2, height / 2]);

//var path = d3.geo.path();
var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("style", "position:fixed; left:170px")
    .attr("height", height);

counties_won_dems = 0; dems_votes = 0;
counties_won_gops = 0; gops_votes = 0;

fips_seen = [];
duplicate_fips = [];
errors_encountered = 0;
lines_handled_counter = 0
all_lines_handled_counter = 0
demstates = 0;
repstates = 0;
demarray = [];
reparray = [];
var mostred = [];
var mostblue= [];
var all_recs = [];

var biggest_blue = [];
var biggest_red = [];

var metros = [];
var socioeconim = [];
var thisd = "";

queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "nodupes_zip.csv", function(d){ metros.push(d);}) 
    .defer(d3.csv, "finaldata-withblueislands.csv", 
	function(d) { 
		thisd = d;
		all_recs.push(d);
		socioeconim[d.fips] = d;
		dem_num = parseInt(d["dem"]);
		gop_num = parseInt(d["rep"]);

		all_lines_handled_counter++;
		dems_votes += dem_num;
		gops_votes += gop_num;
		if( dem_num > gop_num ){ 
			amount = 0.99; 
			counties_won_dems++;
			biggest_blue.push([d.county+","+d["state.x"],dem_num,gop_num,d.fips]);
		} 
		else
		{
			counties_won_gops++;
			amount = 0.01;
			biggest_red.push([d.county+","+d["state.x"],gop_num,dem_num,d.fips]);
		}

		fips_seen[d.fips] = d;
		lines_handled_counter++;

		if(dem_num > gop_num){
			margin = (100 * dem_num) / (gop_num+dem_num);
			if(margin > 85) mostblue.push([margin.toFixed(2),d.county+", "+d["state.x"], d.fips]);
		}
		else{
			margin = (100 * gop_num) / (gop_num+dem_num);
			if(margin > 90) mostred.push([margin.toFixed(2),d.county+", "+d["state.x"], d.fips]);
		}
		rateById.set(d.fips, [amount,d.county,dem_num,gop_num]);
	})
    .await(ready);

function compare(a,b) {
	  if (a[2] < b[2]) return -1;
	  else return 1;
}
	

function compare2(a,b) {
	  if (a[1] > b[1]) return -1;
	  else return 1;
}


function compare3(a,b){
	if( a[1] > b[1] ) return -1;
	else return 1;
}


var storeus = [];
var neighbors = [];
var bluemap = [];
function ready(error, us) {
	storeus = us;
	neighbors = topojson.neighbors(storeus.objects.counties.geometries);
	document.getElementsByClassName("party")[0].innerHTML = "<table><tr><td>Overall</td><td>Counties</td><td>States</td><td>Total Votes</td><td>Votes per County</td></tr><tr><td>Democrats</td><td><span class='demscounties'></span></td><td><span class='demstates'>"+demstates+"</span></td><td><span class='demsvotes'></span></td><td><span class='demspercounty'></span></td></tr><tr><td>Republicans</td><td><span class='repscounties'></span></td><td><span class='repstates'>"+repstates+"</span></td><td><span class='repsvotes'></span></td><td><span class='repspercounty'></span></td></tr></table>";

	//account for duplicates here
	duplicate_fips.forEach(function(v,i){
		rateById.set(i,[0.34,v["towns"].toString(),v["votes"]["dems"],v["votes"]["gops"]]);	
	});

	//calculate blue islands
	blueislands = [];
	cnties = storeus.objects.counties.geometries;
	cntnei = [];
	for(var c=0; c < cnties.length; c++)
	{
		cur = cnties[c];
		cntvt = rateById.get(cur.id);
		if(cntvt){
				  if(cntvt[2] > cntvt[3])
				  {
					  cntnei = neighbors[c];
					  blueneighbors = 0;
					  for(var ni=0; ni < cntnei.length; ni++)
					  {
						  fid = cnties[cntnei[ni]].id;
						  nnd = rateById.get(fid);	
						  if(nnd[2] > nnd[3]) blueneighbors++; 
					  }
					  if(blueneighbors == 0)
					  {	
						  blueislands.push([cur.id, fips_seen[cur.id]["county"]+", "+fips_seen[cur.id]["state.x"], fips_seen[cur.id]["state.x"]]);
					     bluemap[cur.id]=1;
					  }
				  }
	    }
	}

	blueislands.sort(compare);
	biggest_red.sort(compare3);
	biggest_blue.sort(compare3);


	//print out overall counts
	document.getElementsByClassName("demscounties")[0].innerHTML = counties_won_dems; 
	document.getElementsByClassName("demsvotes")[0].innerHTML = dems_votes;
	document.getElementsByClassName("demspercounty")[0].innerHTML = (dems_votes / counties_won_dems).toFixed(2);
	document.getElementsByClassName("repscounties")[0].innerHTML = counties_won_gops ;
	document.getElementsByClassName("repsvotes")[0].innerHTML = gops_votes;
	document.getElementsByClassName("repspercounty")[0].innerHTML = (gops_votes / counties_won_gops).toFixed(2);
	
       var dumcount = 0;

       var g = svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
      .attr("class", function(d) { 
		  dd = rateById.get(d.id);  
		  a=0; 
		  if(dd && dd.length == 4){ 
			  if( d.id in bluemap){ 
				//return "island";
				return "q8-9";
			  }
			  else
			  { 
				a=dd[0];
				return quantize(a); 
			  } 
		  }
		  else{
			  //THESE ARE UNACCOUNTED FOR FIPS WITH GUARDIAN DATA which all correspond to ALASKA
			  return "q3-9";
		  }  
      })
      .attr("title1", function(d){ 
	dd = rateById.get(d.id); 
	if(dd && dd.length == 4){  
		if( d.id in bluemap){return "island"; }
		else{ a=dd[0]; b = quantize(a); if(b=="q0-9"){return "republican"}else{return "democrat";}}
	}else{ return "not"};
      })
      .attr("fip", function(d){ return d.id;})
      .attr("d", path)
      .on('mouseover', mouseover)
      .on('click',handleclick);
	  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
	bluecont ="2012 US PRESIDENTIAL ELECTION RESULTS<br/><br/><a href='javascript: toggle(\"isle\");'><i>BLUE ISLANDS</i></a><br/><table><tr><td><ul>";
	bl = blueislands.length / 2;
	for(var bn=0; bn < blueislands.length; bn++)
	{
		bne = blueislands[bn][0];
		if( bn < bl)
			bluecont += "<li id='"+bne+"'><a href='javascript: highlight("+blueislands[bn][0]+",\"blue\");'>"+ blueislands[bn][1]+"</a></li>";
		else
		{
			if(bn==bl) bluecont += "</ul></td><td><ul>";
			bluecont += "<li id='"+bne+"'><a href='javascript: highlight("+blueislands[bn][0]+",\"blue\");'>"+ blueislands[bn][1]+"</a></li>";
		}
	}
	bluecont += "</ul></td></tr></table><br/><table><tr><td><font color='blue'><a href='javascript: highest(\"dem\");'>HIGHEST DEMOCRAT VOTE COUNTS</a></font></td></tr><tr><td style='vertical-align:top'><ul>";

	//map all rep/dem to paths that have titles of hardcoredemocrat/republican
	biggest_red = biggest_red.filter(function(d){ return d[1] > 95000;});
	biggest_blue = biggest_blue.filter(function(d){ return d[1] > 220000;});
	biggest_red.forEach(function(d){ d3.select(".counties").selectAll("path[fip='"+d[3]+"']").attr("title","highestrepublican");});
	biggest_blue.forEach(function(d){ d3.select(".counties").selectAll("path[fip='"+d[3]+"']").attr("title","highestdemocrat");});

	count = 0;
	for(var bb=0; bb < biggest_blue.length; bb++)
	{
		cb = biggest_blue[bb];
		if(cb[1] > 220000){ 
			bluecont +="<li id='"+cb[3]+"'><a href='javascript: highlight("+cb[3]+",\"blue\");'> "+cb[0]+" ( "+cb[1]+" votes)</a></li>";
			count++;
			if(count == 91) bluecont += "</ul></td><td style='vertical-align:top'><ul>"; 
		} 
	}

	//sort state arrays by percentage
	reparray.sort(compare2);
	demarray.sort(compare2);

	//map all rep/dem to paths that have titles of hardcoredemocrat/republican
	mostred.forEach(function(d){ d3.select(".counties").selectAll("path[fip='"+d[2]+"']").attr("title","hardcorerepublican");});
	mostblue.forEach(function(d){ d3.select(".counties").selectAll("path[fip='"+d[2]+"']").attr("title","hardcoredemocrat");});

	redcont = "<table><tr><td><i><font color='red'><a href='javascript: hardcore(\"gop\");'>Heaviest GOP (90% up)</a></font></i></td><td><font color='red'><a href='javascript: toggle(\"gop\");'>RED STATES</a></font></td></tr><tr><td style='vertical-align:top'><ul>";

	mostred.sort(function(a,b){if(a[0] < b[0])return 1; else return -1;});

	//add most red
	for(var i=0; i < mostred.length; i++)
	{
		redcont += "<li id='"+mostred[i][2]+"'><a href='javascript: highlight("+mostred[i][2]+",\"red\");'>"+mostred[i][1] + " ("+mostred[i][0] + "%)</a></li>"; 
	}
	redcont += "</ul><br/>";

	redcont += "<i><font color='blue'><a href='javascript: hardcore(\"dem\");'>Heaviest DEM  (85% up)</a></font></i><ul>";
   	mostblue.sort(function(a,b){if(a[0] < b[0])return 1; else return -1;});

	//add most blue
	for(var i=0; i < mostblue.length; i++)
	{
		redcont += "<li id='"+mostblue[i][2]+"'><a href='javascript: highlight("+mostblue[i][2]+",\"blue\");'>"+mostblue[i][1] + " ("+mostblue[i][0] + "%)</a></li>"; 
	}

	dembluecont = "</ul><br/><font color='red'><a href='javascript: highest(\"gop\");'>HIGHEST GOP VOTE COUNTS</a></font><br/><br/><ul>";
	count = 0;
	for(var bb=0; bb < biggest_red.length; bb++)
	{
		cb = biggest_red[bb];
		if(cb[1] > 95000){ 
			dembluecont +="<li id='"+cb[3]+"'><a href='javascript: highlight("+cb[3]+",\"red\");'>"+cb[0]+" ( "+cb[1]+" votes)</a></li>"; 
			count++;
			if(count == 91) dembluecont += "</ul></td><td style='vertical-align:top'><ul>";
		}
	}
	dembluecont += "</ul>";

	redcont += dembluecont + "</td><td style='vertical-align:top'><ul>";
	
	//add rep states
	for(var i=0; i < reparray.length; i++)
		redcont += "<li>"+reparray[i][0]+" ("+reparray[i][1]+")</li>";


	//TODO how to highlight either outline or all counties for BLUE and RED STATES
	redcont +="</ul><br/><font color='blue'><a href='javascript: toggle(\"dem\");'>BLUE STATES</a></font><ul>";

	for(var i=0; i < demarray.length; i++)
		redcont += "<li>"+demarray[i][0]+" ("+demarray[i][1]+")</li>";
	redcont += "</ul></td></tr></table>";

	document.getElementsByClassName("repstats")[0].innerHTML = redcont;
	document.getElementsByClassName("demstats")[0].innerHTML = bluecont;
	

	//works fine for 800.. for 600 we need
	if(initialwindow_height < 600)
	{
		if(initialwindow_height < 530){
			jQuery("svg").css("top","-80px");
			jQuery(".statement").css("top","300px").css("font-size","11px");
		}
		if(initialwindow_height > 530){
			jQuery("svg").css("top","-80px").css("left","100px").css("width","700px");
			jQuery(".party").css("position","fixed").css("left","800px").css("top","200px").css("z-index","-20");
			jQuery(".statement").css("top","330px").css("font-size","12px");
		}
	}
}
			

var priorselected = 0;
var priorcolor = 0;

function get_cities(county, state)
{
	var cities = metros.filter(function(d){ return d.county == county && d.state == state; });	
	var cs = cities.map(function(d){return d.city;});
	return cs.sort().join(",  ");
}

var introatbottom = 0;
var thiscd = "";

function closeinfo(){
	jQuery(".statement").hide();
}

function display_county_info(id)
{
	rd = rateById.get(id);
	amount = rd[0];
	priorcolor = quantize(amount);
	dem_num = rd[2];
	gop_num = rd[3];
	
	closediv = "<div id='closeinfo'><a href=\"javascript:closeinfo();\">close</a></div>";
	statement = "";
	cities = get_cities(fips_seen[id]["county"], fips_seen[id]["state.x"]);
	if( dem_num > gop_num) 
	{	
		statement += "County: "+fips_seen[id]["county"]+", "+fips_seen[id]["state.x"]+"<span style='padding-left:200px'>&nbsp;</span>Democrats(<span style='color:blue'>"+dem_num+"</span>) vs GOP("+gop_num+") with ";  	
		margin = (100 * dem_num) / (gop_num+dem_num);
		statement += "<span style='color:blue'>"+margin.toFixed(2)+" %</span> of vote"+closediv+"<br/>";
	}
	else 
	{
		statement += "County: "+fips_seen[id]["county"]+", "+fips_seen[id]["state.x"]+"<span style='padding-left:200px'>&nbsp;</span>Democrats("+dem_num+") vs GOP(<span style='color:red'>"+gop_num+"</span>) with ";  	
		margin = (100 * gop_num) / (gop_num+dem_num);
		statement += "<span style='color:red'>"+margin.toFixed(2)+" %</span> of vote"+closediv+"<br/>";
	}
	
	  statement += "<b><span id='inc' style='cursor:pointer; color:blue;'>-</span> cities:</b><span id='includes'>"+cities+"</span>";
	//now add FIPS info!
	cs = socioeconim[id];
	thiscd = cs;

        statement += "<br/><b><span id='sinc' style='cursor:pointer; color:blue;'>-</span> socioeconomic indicators</b> (<font color='blue'>blue</font> means value is in top 3rd Quartile range, <font color='red'>red</font> means in lower 1st Quartile) <span id='sincludes'>";
	statement += "<table><tr><td>Population <br/><span id='pop'>"+ cs['popul']+"</span>";		// 15,080  - median 30,160 - 45,38
	statement += "</td><td>Median earnings <br/><span id='earnings'>"+ cs['earnings']+"</span>";  //13,190 - median 24,940 - 36,570
	statement += "</td><td>Income index <br/><span id='incomei'>"+ Math.round(10000 * (cs['incomei'] / 7.57))/100;   //between  1 and 7.57   , 2.98 - median 3.41 - 4.45
	statement += "</span></td><td>Education Index <br/><span id='educationi'>"+ Math.round(10000 * (cs['educationi'] / 6.5))/100;  // between 1 and 6.5, 3.3 - median 3.96 - 4.6
	statement += "</span></td><td>Gini Coeff. <br/>"+ cs['gini']+"</td>";
	
	statement += "<td> White <br/><span id='white_not'>"+ cs['white'];   //67 - mean 78% - 94
	statement += "</span><td> African <br/><span id='african'>"+ cs['afric'];	//.4 - mean 8.76 - 9.9
	statement += "</span></td><td> Asian <br/><span id='asian'>"+ cs['asian']; //.2 - mean .5 - 1
	statement += "</span></td><td> Latino <br/><span id='latino'>"+ cs['latin'];   // 1.4 - mean 7.9 - 7.7
	statement += "</span></td><td> Native American <br/><span id='native'>"+ cs['nativ']; //.2 - .3 - .6     
	statement += "</span></td><td> Other <br/>"+ cs['other'] + "</td></tr></table>";//other 1.1 -1.6 - 2.2

	statement += "<table><tr><td>Below Federal Poverty Threshold <br/><span id='poverty_rate'>"+ cs['belowpov'];  //10.9 - 14.6 - 18.9
	statement += "</span></td><td>Children under 6 in poverty <br/><span id='under6'>"+ cs['childpov.x'];  // 16.3 - 23.7 - 31.9
	statement += "</span></td><td>Childern living in poverty <br/><span id='child_poverty'>"+ cs['childpov.x']; // 14.1 - 20.1 - 26.5
	statement += "</span></td><td>Adults 65 and up in poverty <br/><span id='over65'>"+ cs['povo65'] + "</span></td></tr></table>"; // 7.6 - 11.48 - 14.1

	cs['atleasthighschooldiploma'] = 100 - parseFloat(cs['lesshs']);

	statement += "<table><tr><td>less than highschool <br/><span id='less_high'>"+ cs['lesshs'];  //11.4 - 15.4 - 21.6
	statement += "</span></td><td>at least high school <br/><span id='least_high'>"+ cs['atleasthighschooldiploma'];  //78.4 - 84 - 88.6
	statement += "</span></td><td>at least bachelors <br/><span id='least_bach'>"+ cs['leastbach']; // 13.1 - 16.9 - 22.60
	statement += "</span></td><td>graduate degree <br/><span id='grad'>"+ cs['graduate'];  // 4.0 - 5.3 - 7.7
	statement += "</span></td><td>Preschool Enrollment <br/><span id='preschool'>"+ cs['preschl'];  // 34.7 - 43 - 51.7
	statement += "</span></td><td>School enrollment <br/><span id='school_enrollment'>"+ cs['enrollp'] + "</span></td></tr></table>";  // 72.2 - 75.2 - 78.1

	servicenum = Math.round((100 - (parseFloat(cs['wconstruct'])  + parseFloat(cs['wfarm'])  + parseFloat(cs['wmanage'])  + parseFloat(cs['wsales'])  + parseFloat(cs["wtransport"]))) * 100)/100;
	cs['serviceoccupations'] = servicenum;

	statement += "<table><tr><td>Construction/repair <br/><span id='construction'>"+ cs['wconstruct']; // 9.2 - 11.1 - 13.3
	statement += "</span></td><td>Farming/fishing/forestry <br/><span id='fishing'>"+ cs['wfarm'];  // .5 - 1.2 - 2.7
	statement += "</span></td><td>Management/professional <br/><span id='management'>"+ cs['wmanage']; // 25.5 - 29.8 - 33.1
	statement += "</span></td><td>Production/transport <br/><span id='production'>"+ cs['wtransport']; // 11.7 - 15.7 - 20.2
	statement += "</span></td><td>Sales/office <br/><span id='sales'>"+ cs['wsales'];  //20.7 - 23 - 25.4
	statement += "</span></td><td>Service <br/><span id='services'>"+ cs['serviceoccupations'] + "</span></td></tr></table></span>"; //15.2 - 17.44 - 19.2
			
	if(introatbottom == 0)
	{
		jQuery(".intro").css("position","absolute"); introheight = jQuery(document).height() - 120; jQuery(".intro").css("bottom",""); jQuery(".intro").css("top",introheight+"px");
		jQuery(".intro").css("z-index","500");jQuery(".intro").css("width","850px"); jQuery(".intro").css("height","150px"); introatbottom = 1;
	}	

	//now add public health info!!
	
        statement += "<b><span id='pinc' style='cursor:pointer; color:blue;'>-</span> public health indicators</b> (<font color='blue'>blue</font> means value is in lower 1st quartile, <font color='red'>red</font> means in higher 3rd Quartile) <span id='pincludes'>";

	phvars = ["female","adultobese","airpollutionq","ambulatorycare","dentistratio","diabectic","drivealone","excsdrinking","fairpoorhealth","fastfoodresp","freelunch","gini","healthcosts","healthyfood","illiteracy","lowbirthrate","mammography","mentaldays","motordeath","mphratio","noemotionalsupport","noenglish","physicianratio","recfac","rural","sickdays","singleparent","smokers","stdsper100","teenbirthrate","unemployed","uninsured.x","violentcrime"];
	
	for(var i=0; i < phvars.length; i++)
	{
		if( i == 0 ){
			 statement += "<table><tr><td>male<br/><span id='male'>"+ Math.round((100 - parseFloat(cs['female']))*100)/100+"</span></td>";
			 statement += "<td>female<br/><span id='female'>"+ cs['female']+"</span></td>";
		}
		else
		{
			if(phvars[i].indexOf("ratio") > -1)
			{
			 pieces = cs[phvars[i]].split(":");
			 if(pieces[1] == "0")
			 	statement += "<td>"+phvars[i]+"<br/><span id='"+phvars[i]+"'>"+ cs[phvars[i]] +"</span></td>";
			 else
			 	statement += "<td>"+phvars[i]+"<br/><span id='"+phvars[i]+"'>"+ Math.round(((pieces[1] * 100)/pieces[0])*100)/100+"</span></td>";
			}
			else{
				//TODO: check if NA or not
			 statement += "<td>"+phvars[i]+"<br/><span id='"+phvars[i]+"'>"+ Math.round((cs[phvars[i]])*100)/100+"</span></td>";
			}
		}

		if( i > 9)
		{
			if(i % 10 == 0 && i > 13 && i < 30) statement += "</tr></table><table><tr>";
		}
		else
		{
			if(i == 9) statement += "</tr></table><table><tr>";
		}
	}
	statement += "</tr></table>";


	document.getElementsByClassName("statement")[0].innerHTML = statement;

	//TODO:  make this much simpler than old method was
	if(typeof(cs['popul']) != "number") cs['popul'] = parseFloat(cs['popul'].trim().replace(",","").replace(",",""));
	if(typeof(cs['earnings']) != "number") cs['earnings'] = parseFloat(cs['earnings'].trim().replace(",","").replace(",",""));
	if(typeof(cs['incomei']) != "number") cs['incomei'] = parseFloat(cs['incomei'].trim().replace(",",""));
	if(typeof(cs['educationi']) != "number") cs['educationi'] = parseFloat(cs['educationi'].trim().replace(",",""));
	if(cs['popul'] < 15080){ jQuery("#pop").css("color","red");} if(cs['popul'] > 45380){ jQuery("#pop").css("color","blue");}
	if(cs['earnings'] < 13190){ jQuery("#earnings").css("color","red");} if(cs['earnings'] > 36570){ jQuery("#earnings").css("color","blue");} 
	if(cs['incomei'] < 2.98){ jQuery("#incomei").css("color","red");} if(cs['incomei'] > 4.45){ jQuery("#incomei").css("color","blue"); }
	if(cs['educationi'] < 3.3){ jQuery("#educationi").css("color","red");} if(cs['educationi'] > 4.6){ jQuery("#educationi").css("color","blue");} 
	
	if(typeof(cs['white']) != "number") cs['white'] = parseFloat(cs['white'].trim().replace(",",""));
	if(typeof(cs['afric']) != "number")cs['afric'] = parseFloat(cs['afric'].trim().replace(",",""));
	if(typeof(cs['asian']) != "number")cs['asian'] = parseFloat(cs['asian'].trim().replace(",",""));
	if(typeof(cs['latin']) != "number")cs['latin'] = parseFloat(cs['latin'].trim().replace(",",""));
	if(typeof(cs['nativ']) != "number")cs['nativ'] = parseFloat(cs['nativ'].trim().replace(",",""));
	if(cs['white'] < 67){ jQuery("#white_not").css("color","red");} if(cs['white'] > 94){ jQuery("#white_not").css("color","blue"); }
	if(cs['afric'] < .4){ jQuery("#african").css("color","red");} if(cs['afric'] > 9.9){ jQuery("#african").css("color","blue"); }
	if(cs['asian'] < .2){ jQuery("#asian").css("color","red");} if(cs['asian'] > 1){ jQuery("#asian").css("color","blue"); }
	if(cs['latin'] < 1.4){ jQuery("#latino").css("color","red");} if(cs['latin'] > 7.7){ jQuery("#latino").css("color","blue"); }
	if(cs['nativ'] < .2){ jQuery("#native").css("color","red");} if(cs['nativ'] > .6){ jQuery("#native").css("color","blue");} 

	if(typeof(cs['belowpov']) != "number") cs['belowpov'] = parseFloat(cs['belowpov'].trim().replace(",","").replace(",",""));  //10.9 - 14.6 - 18.9
	if(typeof(cs['childpov.x']) != "number") cs['childpov.x'] = parseFloat(cs['childpov.x'].trim().replace(",","").replace(",",""));  // 16.3 - 23.7 - 31.9
	if(typeof(cs['childpov.x'])!= "number") cs['childpov.x'] = parseFloat(cs['childpov.x'].trim().replace(",","").replace(",",""));  // 14.1 - 20.1 - 26.5
	if(typeof(cs['povo65']) != "number") cs['povo65'] = parseFloat(cs['povo65'].trim().replace(",","").replace(",","")); // 7.6 - 11.48 - 14.1
	if(cs['belowpov'] < 10.9){ jQuery("#poverty_rate").css("color","red");} if(cs['belowpov'] > 18.9){ jQuery("#poverty_rate").css("color","blue");}  
	if(cs['childpov.x'] < 16.3){ jQuery("#under6").css("color","red");} if(cs['childpov.x'] > 31.9){ jQuery("#under6").css("color","blue");}  
	if(cs['childpov.x'] < 14.1){ jQuery("#child_poverty").css("color","red");} if(cs['childpov.x'] > 26.5){ jQuery("#child_poverty").css("color","blue");}   //TODO: REMOVE
	if(cs['povo65'] < 7.6){ jQuery("#over65").css("color","red");} if(cs['povo65'] > 14.1){ jQuery("#over65").css("color","blue");}  

	if(typeof(cs['lesshs']) != "number") cs['lesshs'] = parseFloat(cs['lesshs'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['atleasthighschooldiploma']) != "number") cs['atleasthighschooldiploma'] = parseFloat(cs['atleasthighschooldiploma'].trim().replace(",","").replace(",",""));  //78.4 - 84 - 88.6
	if(typeof(cs['leastbach']) != "number") cs['leastbach'] = parseFloat(cs['leastbach'].trim().replace(",","").replace(",","")); // TODO: REMOVE
	if(typeof(cs['graduate']) != "number") cs['graduate'] = parseFloat(cs['graduate'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['preschl'] ) != "number") cs['preschl'] = parseFloat(cs['preschl'].trim().replace(",","").replace(",","")); // 34.7 - 43 - 51.7
	if(typeof(cs['enrollp'] ) != "number") cs['enrollp'] = parseFloat(cs['enrollp'].trim().replace(",","").replace(",","")); // 72.2 - 75.2 - 78.1
	if(cs['lesshs'] < 11.4){ jQuery("#less_high").css("color","red");} if(cs['lesshs'] > 21.6){ jQuery("#less_high").css("color","blue");}  
	if(cs['atleasthighschooldiploma'] < 78.4){ jQuery("#least_high").css("color","red");} if(cs['atleasthighschooldiploma'] > 88.6){ jQuery("#least_high").css("color","blue");}  
	if(cs['leastbach'] < 13.1){ jQuery("#least_bach").css("color","red");} if(cs['leastbach'] > 22.6){ jQuery("#least_bach").css("color","blue");}  
	if(cs['graduate'] < 4.0){ jQuery("#grad").css("color","red");} if(cs['graduate'] > 7.7){ jQuery("#grad").css("color","blue");}  
	if(cs['preschl'] < 34.7){ jQuery("#preschool").css("color","red");} if(cs['preschl'] > 51.7){ jQuery("#preschool").css("color","blue");}  
	if(cs['enrollp'] < 72.2){ jQuery("#school_enrollment").css("color","red");} if(cs['enrollp'] > 78.1){ jQuery("#school_enrollment").css("color","blue");}  

	if(typeof(cs['wconstruct']) != "number") cs['wconstruct'] = parseFloat(cs['wconstruct'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['wfarm']) != "number") cs['wfarm'] = parseFloat(cs['wfarm'].trim().replace(",","").replace(",",""));
	if(typeof(cs['wmanage']) != "number") cs['wmanage'] = parseFloat(cs['wmanage'].trim().replace(",","").replace(",",""));
	if(typeof(cs['wtransport']) != "number") cs['wtransport'] = parseFloat(cs['wtransport'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['wsales']) != "number") cs['wsales'] = parseFloat(cs['wsales'].trim().replace(",","").replace(",","")); 

	if(typeof(cs['serviceoccupations']) != "number") cs['serviceoccupations'] = servicenum;

	if(cs['wconstruct'] < 9.2 ){ jQuery("#construction").css("color","red");} if(cs['wconstruct'] > 13.3){ jQuery("#construction").css("color","blue");} ; // 9.2 - 11.1 - 13.3
	if(cs['wfarm'] < .5 ){ jQuery("#fishing").css("color","red");} if(cs['wfarm'] > 2.7){ jQuery("#fishing").css("color","blue");};  // .5 - 1.2 - 2.7
	if(cs['wmanage'] < 25.5 ){ jQuery("#management").css("color","red");} if(cs['wmanage'] > 33.1){ jQuery("#management").css("color","blue");}; // 25.5 - 29.8 - 33.1
	if(cs['wtransport'] < 11.7 ){ jQuery("#production").css("color","red");} if(cs['wtransport'] > 20.2){ jQuery("#production").css("color","blue");}; // 11.7 - 15.7 - 20.2
	if(cs['wsales'] < 20.7 ){ jQuery("#sales").css("color","red");} if(cs['wsales'] > 25.4){ jQuery("#sales").css("color","blue");}; 

	if(servicenum < 15.2 ){ jQuery("#services").css("color","red");} if(servicenum > 19.2){ jQuery("#services").css("color","blue");}; 


	//Now Highlight Public Health
	//["female", "adultobese", "airpollutionq", "ambulatorycare", "dentistratio", "diabectic", "drivealone", "excsdrinking", "fairpoorhealth", "fastfoodresp", "freelunch", "gini", "healthcosts", "healthyfood", "illiteracy", "lowbirthrate", "mammography", "mentaldays", "motordeath", "mphratio", "noemotionalsupport", "noenglish", "physicianratio", "recfac", "rural", "sickdays", "singleparent", "smokers", "stdsper100", "teenbirthrate", "unemployed", "uninsured.x", "violentcrime"]
	phquartiles = [[49.5,51.2],[28,33],[1,3],[59,94],[],[9,12],[75,82],[10.05,18],[13,20.48],[36,54],[26,47],[.407,.454],[7923,10161],[33,71],[8.3,15.9],[6.8,9.2],[59.1,70],[2.8,4.1],[16,32],
		    	[],[16,22.3],[.8,3.8],[],[0,11.4],[35.8,89.1],[3,4.4],[24,36],[17,25],[132,374],[31,61],[7.1,11.1],[14,22],[120,378]];
	
	for(var i=0; i < phvars.length; i++)
	{
		qs = phquartiles[i];
		vs = cs[phvars[i]];
		vt = phvars[i];
		if(vt.indexOf("ratio") == -1)
		{
			if(!isNaN(parseFloat(vs)))
			{
				console.log(i+ ": " +vt+", "+ vs+ " --- "+qs[0]+"...."+qs[1]);
				if(vs < qs[0] ){ jQuery("#"+vt).css("color","blue");} 
				if(vs > qs[1] ){ jQuery("#"+vt).css("color","red");};
			}
		}
	}
	if(100 - parseFloat(cs['female']) < 48.8 ){ jQuery("#male").css("color","blue");} if(100 - parseFloat(cs['female']) > 50.5){ jQuery("#male").css("color","red");};


	  jQuery("#inc").click(function(){ 
		if(jQuery("#inc").html() == "-"){ jQuery("#includes").hide(); jQuery("#inc").html("+"); }
		else { jQuery("#includes").show(); jQuery("#inc").html("-"); }
	 });
	  jQuery("#sinc").click(function(){ 
		if(jQuery("#sinc").html() == "-"){ jQuery("#sincludes").hide(); jQuery("#sinc").html("+"); }
		else { jQuery("#sincludes").show(); jQuery("#sinc").html("-"); }
	 });
	  jQuery("#pinc").click(function(){ 
		if(jQuery("#pinc").html() == "-"){ jQuery("#pincludes").hide(); jQuery("#pinc").html("+"); }
		else { jQuery("#pincludes").show(); jQuery("#pinc").html("-"); }
	 });
}

var clicked = 0;
var current_color = "";
var current_clicked = 0;

var centered;
function handleclick(d){
	var x, y, k;
	st = d3.select(".states")
	if(current_clicked == d.id)
	{ 	
		//deselect and zoom out 
		if(current_clicked != 0){ d3.select(".counties").selectAll("path[fip='"+current_clicked+"']").attr("class",priorcolor);} 
		current_clicked = 0;
		clicked = 0; 
		
		x = width / 2;
		y = height / 2;
		k = 1;
		centered = null;
		
		//make state lines white
		jQuery(st[0]).css("stroke","#fff");
	}
	else
	{
		//select and zoom in a little
		d3.select(".counties").selectAll("path[fip='"+current_clicked+"']").attr("class",priorcolor);
		clicked = 1;
		current_clicked = d.id;
		current_color = d3.select(this).attr("class");
		d3.select(this).attr("class","yellow");
		if(fips_seen[d.id]){ display_county_info(d.id);}

		var centroid = path.centroid(d);
		x = centroid[0];
		y = centroid[1];
		k = 4;
		centered = d;
		
		//hide state lines
		jQuery(st[0]).css("stroke","none");
	}	

	var g = d3.select("g");
	g.selectAll("path").classed("active", centered && function(d) { return d === centered; });

	g.transition()
		.duration(450)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		.style("stroke-width", 1.5 / k + "px");

}

function mouseover(d) {
	jQuery(".statement").css("display","block");

	if(clicked == 0 && islandtoggle ==0 && demtoggle == 0 && reptoggle == 0 && harddemtoggle == 0 && hardgoptoggle == 0 && highestdemtoggle == 0 && highestgoptoggle == 0){
		c = d3.select(this).attr("class");
		if( c != "q3-9")
		{
		  if(priorselected != 0) { d3.select(priorselected).attr("class",priorcolor); }
		  priorselected = this;
		  d3.select(this).attr("class","selected");
		}
   	}

	if(clicked == 0)
	{
		id = d.id;
		if(fips_seen[id])
		{
			display_county_info(id);
		}
	}
}

//TODO
//given the socioeconomic data and how the counties voted, make a classifier which will predict how a theoretical county would vote ( phase 1; dem/rep, phase 2: to what degree dem/rep, very/barely)
//find clusters of similar counties and see if they voted similarly

//make a report on how the blue islands differ from their neighbors

//future enhancements ( optimize loading some, add counter to show loading,  add more socioeconomic data (does measure have more?), 
