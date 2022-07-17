 const storage = {
    update_selected_city : function(city)  {
        localStorage.setItem("selected_city", city)
    },
    get_selected_city : function() {
        return localStorage.getItem("selected_city")
    },
    update_list_city : function(list_city) {
        localStorage.setItem("list_city", JSON.stringify(list_city) );
    },
    get_list_city : function() {
        return JSON.parse(localStorage.getItem("list_city"));
    }
 };

 export { storage }