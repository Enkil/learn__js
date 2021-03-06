//////*Initializes Database*////////
function dbInitialize(){
	if (window.openDatabase){
		
		db = openDatabase("food_db", "1.0", "Web SQL Storage Demo Database", 1*1024*1024); //Open Database
		
		if (db){ //If database exists
		create_table_if_not_exists(db); // create a table (called 'cal_list') if it doesnt exist
		populate_values_if_empty(db);	// If table is empty, then fill it with sample values	
		} else
		{
			alert('no db open');
		}
	} else{
		alert("It seems that your browser does not support WebSQL databases. Please use a browser which does, otherwise parts of this application may not run as intended.");
	}

}


//////*Searches table for keywords and displays search results on page*////////
function search_cal_list(search_query){	
	var search_terms = search_query.split(","); //split keywords into an array
	var sqlstring =  "Select * from cal_list where ";
	
	var thelength = search_terms.length - 1;
	for (var k=0; k<=thelength; k++){
		if (k != thelength){
			sqlstring +=  " food_name like '\%"+search_terms[k].trim()+"\%' OR";
			
		} else if ( k == thelength) {
			sqlstring +=  " food_name like '\%"+search_terms[k].trim()+"\%'";
		}
	}
	
	var food_name;
	var calories;
	var search_terms;
	
	var resultsdiv  = document.getElementById('details');
	resultsdiv.innerHTML = "<table id=\"detailstable\"><thead><tr><th>Food Name</th><th>Calories* (In kilocal)</th></tr></thead><tbody id=\"tablebody\"></tbody></table>";
	
	var thetable = document.getElementById('tablebody');
	
	if (db){
	db.transaction(
		function(t){
		t.executeSql(sqlstring, [], function(t,r){
		
			 for (j=0;j<r.rows.length; j++){
				food_name = r.rows.item(j).food_name;
				calories = r.rows.item(j).calories;
				search_terms = r.rows.item(j).servings;
				thetable.innerHTML += "<tr><td>"+food_name+" <span class=\"smallstuff\">(serving size: "+search_terms+")</span></td><td>"+calories+"</td></tr>";
			}
			
			
		}, function(t,e){});
	}
	);
	
	
	
  } //closing parathesis of if(db)
	 
	else
	{
		alert('No DB Open');
	}
	
}



//////*If table is empty, then it will populate the table with sample values*////////
function populate_values_if_empty(db){
var rowcount;
	db.transaction(
		function(t){
			t.executeSql("SELECT COUNT(*) AS rowcount FROM cal_list", [], function(t,r){
				rowcount = parseInt(r.rows.item(0).rowcount);
				if (rowcount == 0){
					insert_into_table(db, "Margherita pizza", "300", "one slice");
					insert_into_table(db, "Plain donut", "320", "one piece");
					insert_into_table(db, "Pepperoni pizza", "380", "one slice");
					insert_into_table(db, "Chicken and salami pizza", "400", "one slice");
					insert_into_table(db, "Chocolate donut", "450", "one piece");
					insert_into_table(db, "Cheesecake", "320", "one slice");
					insert_into_table(db, "Grilled cheese sandwich", "350", "one slice");
				}
				else{
					///
				}
			}, function(t,e){alert("code:"+e.code+", message:"+e.message);}
			
			);	
		}
	);

}


//////*Self explanatory ;) *////////
function create_table_if_not_exists(db){
	db.transaction(
	function(t){
	t.executeSql("CREATE TABLE IF NOT EXISTS cal_list (food_name TEXT PRIMARY KEY, calories REAL, servings TEXT)");
}
);

}




//////*Self explanatory ;) *////////
function insert_into_table(db, food_name, amount_of_calories, serving_size){
	db.transaction(
		function(t){
			t.executeSql("INSERT INTO cal_list VALUES (?, ?, ?)", [food_name, amount_of_calories, serving_size]);
		}
	);
}








