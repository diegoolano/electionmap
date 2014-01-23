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
	if(initialwindow_height > 600){currenttop = 500 - (.5 * ( 779 - initialwindow_height) );}
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

function find_votes(d,tag)
{
	for(var i=1; i < 17; i++)
	{
		party = "Party"+i;
		if(d[party] == tag) {	return d["Votes"+i]; }
	}
}
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

    //.defer(d3.csv, "measureofamerica_counties2013-14.csv",function(d){ socioeconim.push(d);}) 
queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "nodupes_zip.csv", function(d){ metros.push(d);}) 
    .defer(d3.csv, "measureofamerica_counties2013-14.csv",function(d){ if(d.year == 2010) socioeconim[d.fips] = d;}) 
    .defer(d3.csv, "smaller2012president.csv", 
	function(d) { 
		all_recs.push(d);
		dem_num = parseInt(find_votes(d,"Dem"));
		gop_num = parseInt(find_votes(d,"GOP"));

		all_lines_handled_counter++;
		if( d.FIPSCode != 0)
		{
			dems_votes += dem_num;
			gops_votes += gop_num;
			if( dem_num > gop_num ){ 
				amount = 0.99; 
				counties_won_dems++;
				biggest_blue.push([d.CountyName+","+d.StatePostal,dem_num,gop_num,d.FIPSCode]);
			} 
			else
			{
				counties_won_gops++;
				amount = 0.01;
				biggest_red.push([d.CountyName+","+d.StatePostal,gop_num,dem_num,d.FIPSCode]);
			}

			if( d.FIPSCode in fips_seen)
			{
				if( d.FIPSCode in duplicate_fips){
					duplicate_fips[d.FIPSCode]["counter"]++;
					duplicate_fips[d.FIPSCode]["towns"].push(d.CountyName+", "+d.StatePostal);
					duplicate_fips[d.FIPSCode]["votes"]["dems"]+=dem_num;
					duplicate_fips[d.FIPSCode]["votes"]["gops"]+=gop_num;
				}
				else{ 
					duplicate_fips[d.FIPSCode] = []; 
					duplicate_fips[d.FIPSCode]["counter"]=1; 
					duplicate_fips[d.FIPSCode]["towns"]=[]; 
					duplicate_fips[d.FIPSCode]["towns"].push(d.CountyName+", "+d.StatePostal);
					duplicate_fips[d.FIPSCode]["votes"]=[];
					duplicate_fips[d.FIPSCode]["votes"]["dems"]=dem_num;
					duplicate_fips[d.FIPSCode]["votes"]["gops"]=gop_num;
				}
				errors_encountered++;
			}
			else
			{
				fips_seen[d.FIPSCode] = d;
				lines_handled_counter++;

				if(dem_num > gop_num){
					margin = (100 * dem_num) / (gop_num+dem_num);
					if(margin > 85) mostblue.push([margin.toFixed(2),d.CountyName+", "+d.StatePostal, d.FIPSCode]);
				}
				else{
					margin = (100 * gop_num) / (gop_num+dem_num);
					if(margin > 90) mostred.push([margin.toFixed(2),d.CountyName+", "+d.StatePostal, d.FIPSCode]);
				}
				rateById.set(d.FIPSCode, [amount,d.CountyName,dem_num,gop_num]);
			}
		}
		else
		{
		  if(dem_num > gop_num)	
		  {
                   if(d.CountyName != "District of Columbia")
			{ 
				 demstates++;
		   		percent = (100 * dem_num)/(gop_num + dem_num);
		   		demarray.push([d.CountyName,percent.toFixed(2)]);
			}
		   }
		   else{ 
		   	repstates++;
		   	percent = (100 * gop_num)/(gop_num + dem_num);
		   	reparray.push([d.CountyName,percent.toFixed(2)]);
		   }
		}
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
						  blueislands.push([cur.id, fips_seen[cur.id]["CountyName"]+", "+fips_seen[cur.id]["StatePostal"], fips_seen[cur.id]["StatePostal"]]);
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
function display_county_info(id)
{
	rd = rateById.get(id);
	amount = rd[0];
	priorcolor = quantize(amount);
	dem_num = rd[2];
	gop_num = rd[3];
	
	cities = get_cities(fips_seen[id]["CountyName"], fips_seen[id]["StatePostal"]);
	if( dem_num > gop_num) 
	{	
		statement = "County: "+fips_seen[id]["CountyName"]+", "+fips_seen[id]["StatePostal"]+"<br/>Democrats(<span style='color:blue'>"+dem_num+"</span>) vs GOP("+gop_num+") with ";  	
		margin = (100 * dem_num) / (gop_num+dem_num);
		statement += "<span style='color:blue'>"+margin.toFixed(2)+" %</span> of vote<br/>";
	}
	else 
	{
		statement = "County: "+fips_seen[id]["CountyName"]+", "+fips_seen[id]["StatePostal"]+"<br/>Democrats("+dem_num+") vs GOP(<span style='color:red'>"+gop_num+"</span>) with ";  	
		margin = (100 * gop_num) / (gop_num+dem_num);
		statement += "<span style='color:red'>"+margin.toFixed(2)+" %</span> of vote<br/>";
	}
	
	  statement += "<b><span id='inc' style='cursor:pointer; color:blue;'>-</span> cities:</b><span id='includes'>"+cities+"</span>";
	//now add FIPS info!
	cs = socioeconim[id];
	
        statement += "<br/><b><span id='sinc' style='cursor:pointer; color:blue;'>-</span> socioeconomic indicators</b> (<font color='blue'>blue</font> means value is in top 3rd Quartile range, <font color='red'>red</font> means in lower 1st Quartile) <span id='sincludes'>";
	statement += "<table><tr><td>Population <br/><span id='pop'>"+ cs['_total_population_']+"</span>";		// 15,080  - median 30,160 - 45,38
	statement += "</td><td>Median earnings <br/><span id='earnings'>"+ cs['median_earnings_(2010_dollars)']+"</span>";  //13,190 - median 24,940 - 36,570
	statement += "</td><td>Income index <br/><span id='incomeindex'>"+ Math.round(10000 * (cs['incomeindex'] / 7.57))/100;   //between  1 and 7.57   , 2.98 - median 3.41 - 4.45
	statement += "</span></td><td>Education Index <br/><span id='educationindex'>"+ Math.round(10000 * (cs['educationindex'] / 6.5))/100;  // between 1 and 6.5, 3.3 - median 3.96 - 4.6
	statement += "</span></td><td>Gini Coeff. <br/>"+ cs['gini_coefficient']+"</td>";
	
	statement += "<td> White <br/><span id='white_not'>"+ cs['white_not_latino_population_(%)'];   //67 - mean 78% - 94
	statement += "</span><td> African <br/><span id='african'>"+ cs['african_american_population_(%)'];	//.4 - mean 8.76 - 9.9
	statement += "</span></td><td> Asian <br/><span id='asian'>"+ cs['asian_american_population_(%)']; //.2 - mean .5 - 1
	statement += "</span></td><td> Latino <br/><span id='latino'>"+ cs['latino_population_(%)'];   // 1.4 - mean 7.9 - 7.7
	statement += "</span></td><td> Native American <br/><span id='native'>"+ cs['native_american_population_(%)']; //.2 - .3 - .6     
	statement += "</span></td><td> Other <br/>"+ cs['population_some_other_race_or_races_(%)'] + "</td></tr></table>";//other 1.1 -1.6 - 2.2

	statement += "<table><tr><td>Below Federal Poverty Threshold <br/><span id='poverty_rate'>"+ cs['poverty_rate_(%_below_federal_poverty_threshold)'];  //10.9 - 14.6 - 18.9
	statement += "</span></td><td>Children under 6 in poverty <br/><span id='under6'>"+ cs['children_under_6_living_in_poverty_(%)'];  // 16.3 - 23.7 - 31.9
	statement += "</span></td><td>Childern living in poverty <br/><span id='child_poverty'>"+ cs['child_poverty_(%_living_in_families_below_the_poverty_line)']; // 14.1 - 20.1 - 26.5
	statement += "</span></td><td>Adults 65 and up in poverty <br/><span id='over65'>"+ cs['adults_65_and_older_living_in_poverty_(%)'] + "</span></td></tr></table>"; // 7.6 - 11.48 - 14.1

	statement += "<table><tr><td>less than highschool <br/><span id='less_high'>"+ cs['less_than_high_school_(%)'];  //11.4 - 15.4 - 21.6
	statement += "</span></td><td>at least high school <br/><span id='least_high'>"+ cs['at_least_high_school_diploma(%)'];  //78.4 - 84 - 88.6
	statement += "</span></td><td>at least bachelors <br/><span id='least_bach'>"+ cs['at_least_bachelors_degree(%)']; // 13.1 - 16.9 - 22.60
	statement += "</span></td><td>graduate degree <br/><span id='grad'>"+ cs['graduate_degree(%)'];  // 4.0 - 5.3 - 7.7
	statement += "</span></td><td>Preschool Enrollment <br/><span id='preschool'>"+ cs['preschool_enrollment_ratio_(%_enrolled_ages_3_and_4)'];  // 34.7 - 43 - 51.7
	statement += "</span></td><td>School enrollment <br/><span id='school_enrollment'>"+ cs['school_enrollment(%)'] + "</span></td></tr></table>";  // 72.2 - 75.2 - 78.1

	statement += "<table><tr><td>Construction/repair <br/><span id='construction'>"+ cs['construction,_extraction,_maintenance_and_repair_occupations_(%)']; // 9.2 - 11.1 - 13.3
	statement += "</span></td><td>Farming/fishing/forestry <br/><span id='fishing'>"+ cs['farming,_fishing,_and_forestry_occupations_(%)'];  // .5 - 1.2 - 2.7
	statement += "</span></td><td>Management/professional <br/><span id='management'>"+ cs['management,_professional,_and_related_occupations_(%)']; // 25.5 - 29.8 - 33.1
	statement += "</span></td><td>Production/transport <br/><span id='production'>"+ cs['production,_transportation,_and_material_moving_occupations_(%)']; // 11.7 - 15.7 - 20.2
	statement += "</span></td><td>Sales/office <br/><span id='sales'>"+ cs['sales_and_office_occupations_(%)'];  //20.7 - 23 - 25.4
	statement += "</span></td><td>Service <br/><span id='services'>"+ cs['service_occupations_(%)_'] + "</span></td></tr></table></span>"; //15.2 - 17.44 - 19.2
			
	if(introatbottom == 0)
	{
		jQuery(".intro").css("position","absolute"); introheight = jQuery(document).height() - 120; jQuery(".intro").css("bottom",""); jQuery(".intro").css("top",introheight+"px");
		jQuery(".intro").css("z-index","500");jQuery(".intro").css("width","850px"); jQuery(".intro").css("height","150px"); introatbottom = 1;
	}	
	document.getElementsByClassName("statement")[0].innerHTML = statement;

	//console.log("current fip: "+id);
	if(typeof(cs['_total_population_']) != "number") cs['_total_population_'] = parseFloat(cs['_total_population_'].trim().replace(",","").replace(",",""));
	if(typeof(cs['median_earnings_(2010_dollars)']) != "number") cs['median_earnings_(2010_dollars)'] = parseFloat(cs['median_earnings_(2010_dollars)'].trim().replace(",","").replace(",",""));
	if(typeof(cs['incomeindex']) != "number") cs['incomeindex'] = parseFloat(cs['incomeindex'].trim().replace(",",""));
	if(typeof(cs['educationindex']) != "number") cs['educationindex'] = parseFloat(cs['educationindex'].trim().replace(",",""));
	if(cs['_total_population_'] < 15080){ jQuery("#pop").css("color","red");} if(cs['_total_population_'] > 45380){ jQuery("#pop").css("color","blue");}
	if(cs['median_earnings_(2010_dollars)'] < 13190){ jQuery("#earnings").css("color","red");} if(cs['median_earnings_(2010_dollars)'] > 36570){ jQuery("#earnings").css("color","blue");} 
	if(cs['incomeindex'] < 2.98){ jQuery("#incomeindex").css("color","red");} if(cs['incomeindex'] > 4.45){ jQuery("#incomeindex").css("color","blue"); }
	if(cs['educationindex'] < 3.3){ jQuery("#educationindex").css("color","red");} if(cs['educationindex'] > 4.6){ jQuery("#educationindex").css("color","blue");} 
	
	if(typeof(cs['white_not_latino_population_(%)']) != "number") cs['white_not_latino_population_(%)'] = parseFloat(cs['white_not_latino_population_(%)'].trim().replace(",",""));
	if(typeof(cs['african_american_population_(%)']) != "number")cs['african_american_population_(%)'] = parseFloat(cs['african_american_population_(%)'].trim().replace(",",""));
	if(typeof(cs['asian_american_population_(%)']) != "number")cs['asian_american_population_(%)'] = parseFloat(cs['asian_american_population_(%)'].trim().replace(",",""));
	if(typeof(cs['latino_population_(%)']) != "number")cs['latino_population_(%)'] = parseFloat(cs['latino_population_(%)'].trim().replace(",",""));
	if(typeof(cs['native_american_population_(%)']) != "number")cs['native_american_population_(%)'] = parseFloat(cs['native_american_population_(%)'].trim().replace(",",""));
	if(cs['white_not_latino_population_(%)'] < 67){ jQuery("#white_not").css("color","red");} if(cs['white_not_latino_population_(%)'] > 94){ jQuery("#white_not").css("color","blue"); }
	if(cs['african_american_population_(%)'] < .4){ jQuery("#african").css("color","red");} if(cs['african_american_population_(%)'] > 9.9){ jQuery("#african").css("color","blue"); }
	if(cs['asian_american_population_(%)'] < .2){ jQuery("#asian").css("color","red");} if(cs['asian_american_population_(%)'] > 1){ jQuery("#asian").css("color","blue"); }
	if(cs['latino_population_(%)'] < 1.4){ jQuery("#latino").css("color","red");} if(cs['latino_population_(%)'] > 7.7){ jQuery("#latino").css("color","blue"); }
	if(cs['native_american_population_(%)'] < .2){ jQuery("#native").css("color","red");} if(cs['native_american_population_(%)'] > .6){ jQuery("#native").css("color","blue");} 

	if(typeof(cs['poverty_rate_(%_below_federal_poverty_threshold)']) != "number") cs['poverty_rate_(%_below_federal_poverty_threshold)'] = parseFloat(cs['poverty_rate_(%_below_federal_poverty_threshold)'].trim().replace(",","").replace(",",""));  //10.9 - 14.6 - 18.9
	if(typeof(cs['children_under_6_living_in_poverty_(%)']) != "number") cs['children_under_6_living_in_poverty_(%)'] = parseFloat(cs['children_under_6_living_in_poverty_(%)'].trim().replace(",","").replace(",",""));  // 16.3 - 23.7 - 31.9
	if(typeof(cs['child_poverty_(%_living_in_families_below_the_poverty_line)'])!= "number") cs['child_poverty_(%_living_in_families_below_the_poverty_line)'] = parseFloat(cs['child_poverty_(%_living_in_families_below_the_poverty_line)'].trim().replace(",","").replace(",",""));  // 14.1 - 20.1 - 26.5
	if(typeof(cs['adults_65_and_older_living_in_poverty_(%)']) != "number") cs['adults_65_and_older_living_in_poverty_(%)'] = parseFloat(cs['adults_65_and_older_living_in_poverty_(%)'].trim().replace(",","").replace(",","")); // 7.6 - 11.48 - 14.1
	if(cs['poverty_rate_(%_below_federal_poverty_threshold)'] < 10.9){ jQuery("#poverty_rate").css("color","red");} if(cs['poverty_rate_(%_below_federal_poverty_threshold)'] > 18.9){ jQuery("#poverty_rate").css("color","blue");}  
	if(cs['children_under_6_living_in_poverty_(%)'] < 16.3){ jQuery("#under6").css("color","red");} if(cs['children_under_6_living_in_poverty_(%)'] > 31.9){ jQuery("#under6").css("color","blue");}  
	if(cs['child_poverty_(%_living_in_families_below_the_poverty_line)'] < 14.1){ jQuery("#child_poverty").css("color","red");} if(cs['child_poverty_(%_living_in_families_below_the_poverty_line)'] > 26.5){ jQuery("#child_poverty").css("color","blue");}  
	if(cs['adults_65_and_older_living_in_poverty_(%)'] < 7.6){ jQuery("#over65").css("color","red");} if(cs['adults_65_and_older_living_in_poverty_(%)'] > 14.1){ jQuery("#over65").css("color","blue");}  

	if(typeof(cs['less_than_high_school_(%)']) != "number") cs['less_than_high_school_(%)'] = parseFloat(cs['less_than_high_school_(%)'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['at_least_high_school_diploma(%)']) != "number") cs['at_least_high_school_diploma(%)'] = parseFloat(cs['at_least_high_school_diploma(%)'].trim().replace(",","").replace(",",""));  //78.4 - 84 - 88.6
	if(typeof(cs['at_least_bachelors_degree(%)']) != "number") cs['at_least_bachelors_degree(%)'] = parseFloat(cs['at_least_bachelors_degree(%)'].trim().replace(",","").replace(",",""));
	if(typeof(cs['graduate_degree(%)']) != "number") cs['graduate_degree(%)'] = parseFloat(cs['graduate_degree(%)'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['preschool_enrollment_ratio_(%_enrolled_ages_3_and_4)'] ) != "number") cs['preschool_enrollment_ratio_(%_enrolled_ages_3_and_4)'] = parseFloat(cs['preschool_enrollment_ratio_(%_enrolled_ages_3_and_4)'].trim().replace(",","").replace(",","")); // 34.7 - 43 - 51.7
	if(typeof(cs['school_enrollment(%)'] ) != "number") cs['school_enrollment(%)'] = parseFloat(cs['school_enrollment(%)'].trim().replace(",","").replace(",","")); // 72.2 - 75.2 - 78.1
	if(cs['less_than_high_school_(%)'] < 11.4){ jQuery("#less_high").css("color","red");} if(cs['less_than_high_school_(%)'] > 21.6){ jQuery("#less_high").css("color","blue");}  
	if(cs['at_least_high_school_diploma(%)'] < 78.4){ jQuery("#least_high").css("color","red");} if(cs['at_least_high_school_diploma(%)'] > 88.6){ jQuery("#least_high").css("color","blue");}  
	if(cs['at_least_bachelors_degree(%)'] < 13.1){ jQuery("#least_bach").css("color","red");} if(cs['at_least_bachelors_degree(%)'] > 22.6){ jQuery("#least_bach").css("color","blue");}  
	if(cs['graduate_degree(%)'] < 4.0){ jQuery("#grad").css("color","red");} if(cs['graduate_degree(%)'] > 7.7){ jQuery("#grad").css("color","blue");}  
	if(cs['preschool_enrollment_ratio_(%_enrolled_ages_3_and_4)'] < 34.7){ jQuery("#preschool").css("color","red");} if(cs['preschool_enrollment_ratio_(%_enrolled_ages_3_and_4)'] > 51.7){ jQuery("#preschool").css("color","blue");}  
	if(cs['school_enrollment(%)'] < 72.2){ jQuery("#school_enrollment").css("color","red");} if(cs['school_enrollment(%)'] > 78.1){ jQuery("#school_enrollment").css("color","blue");}  

	if(typeof(cs['construction,_extraction,_maintenance_and_repair_occupations_(%)']) != "number") cs['construction,_extraction,_maintenance_and_repair_occupations_(%)'] = parseFloat(cs['construction,_extraction,_maintenance_and_repair_occupations_(%)'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['farming,_fishing,_and_forestry_occupations_(%)']) != "number") cs['farming,_fishing,_and_forestry_occupations_(%)'] = parseFloat(cs['farming,_fishing,_and_forestry_occupations_(%)'].trim().replace(",","").replace(",",""));
	if(typeof(cs['management,_professional,_and_related_occupations_(%)']) != "number") cs['management,_professional,_and_related_occupations_(%)'] = parseFloat(cs['management,_professional,_and_related_occupations_(%)'].trim().replace(",","").replace(",",""));
	if(typeof(cs['production,_transportation,_and_material_moving_occupations_(%)']) != "number") cs['production,_transportation,_and_material_moving_occupations_(%)'] = parseFloat(cs['production,_transportation,_and_material_moving_occupations_(%)'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['sales_and_office_occupations_(%)']) != "number") cs['sales_and_office_occupations_(%)'] = parseFloat(cs['sales_and_office_occupations_(%)'].trim().replace(",","").replace(",","")); 
	if(typeof(cs['service_occupations_(%)_']) != "number") cs['service_occupations_(%)_'] = parseFloat(cs['service_occupations_(%)_'].trim().replace(",","").replace(",","")); 
	if(cs['construction,_extraction,_maintenance_and_repair_occupations_(%)'] < 9.2 ){ jQuery("#construction").css("color","red");} if(cs['construction,_extraction,_maintenance_and_repair_occupations_(%)'] > 13.3){ jQuery("#construction").css("color","blue");} ; // 9.2 - 11.1 - 13.3
	if(cs['farming,_fishing,_and_forestry_occupations_(%)'] < .5 ){ jQuery("#fishing").css("color","red");} if(cs['farming,_fishing,_and_forestry_occupations_(%)'] > 2.7){ jQuery("#fishing").css("color","blue");};  // .5 - 1.2 - 2.7
	if(cs['management,_professional,_and_related_occupations_(%)'] < 25.5 ){ jQuery("#management").css("color","red");} if(cs['management,_professional,_and_related_occupations_(%)'] > 33.1){ jQuery("#management").css("color","blue");}; // 25.5 - 29.8 - 33.1
	if(cs['production,_transportation,_and_material_moving_occupations_(%)'] < 11.7 ){ jQuery("#production").css("color","red");} if(cs['production,_transportation,_and_material_moving_occupations_(%)'] > 20.2){ jQuery("#production").css("color","blue");}; // 11.7 - 15.7 - 20.2
	if(cs['sales_and_office_occupations_(%)'] < 20.7 ){ jQuery("#sales").css("color","red");} if(cs['sales_and_office_occupations_(%)'] > 25.4){ jQuery("#sales").css("color","blue");}; 
	if(cs['service_occupations_(%)_'] < 15.2 ){ jQuery("#services").css("color","red");} if(cs['service_occupations_(%)_'] > 19.2){ jQuery("#services").css("color","blue");}; 

	  jQuery("#inc").click(function(){ 
		if(jQuery("#inc").html() == "-"){ jQuery("#includes").hide(); jQuery("#inc").html("+"); }
		else { jQuery("#includes").show(); jQuery("#inc").html("-"); }
	 });
	  jQuery("#sinc").click(function(){ 
		if(jQuery("#sinc").html() == "-"){ jQuery("#sincludes").hide(); jQuery("#sinc").html("+"); }
		else { jQuery("#sincludes").show(); jQuery("#sinc").html("-"); }
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
