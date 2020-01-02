"use strict";

const calculateGold = function (gold, quantity) {
    const newGold = gold * quantity;
    return newGold;
};

const calculateSilver = function (silver, quantity) {
    const newSilver = parseFloat(silver * quantity);
    if ( newSilver > 100 ) {
        const sToG = newSilver / 100;
        return sToG;
    }
    else { return newSilver; }
};

const calculateCopper = function (copper, quantity) {
    const newCopper = parseFloat(copper * quantity);
    if ( newCopper > 100 ) {
        const cToS = newCopper / 100;
        return cToS;
    } 
    else { return newCopper; }
};

$(document).ready(function() {
    $("#item").focus();
    const items = [];
    const golds = [];
    const silvers = [];
    const coppers = [];

    // CALCULATE BUTTON
    $("#calculate").click( function() {
        let item = $("#item").val().trim();
        let gold = parseInt( $("#gold").val().trim() );
        let silver = parseFloat( $("#silver").val().trim() );
        let copper = parseFloat( $("#copper").val().trim() );
        let quantity = $("#quantity").val().trim();
        let profit;

        if ( $("#gold").val() === "") { gold = 0; }
        if ( $("#silver").val() === "") { silver = 0; }
        if ( $("#copper").val() === "") { copper = 0; }
        
        // Item & Quantity data validation
        if (quantity === "" ) {
           $("#quantity").next().text("Enter number of items.");
        }
        if ( item === "" ) {
            $("#item").next().text("Please enter the name of the item.");
        }
        
        // Combining currencies
        gold = calculateGold(gold,quantity);
        silver = calculateSilver(silver, quantity);
        if ( silver % 1 !== 0 ) {
            let newSil = parseFloat(silver.toFixed(2).split(".")[1]);
            let addToG = parseFloat(silver.toString().split(".")[0]);
            silver = newSil;
            gold = gold + addToG;
            console.log(copper)
            console.log(silver)
            console.log(gold)
        }
        copper = calculateCopper(copper, quantity);
        if ( copper % 1 !== 0 ) { // has decimal (100 doesnt count)
            console.log("copper%1!==0")
            let newCo = parseFloat(copper.toFixed(2).split(".")[1]);
            let addToS = parseFloat(copper.toString().split(".")[0]);
            console.log(newCo)
            console.log(addToS)
            copper = newCo;
            silver = silver + addToS;
        }
        else if (copper >= 100 && copper % 100 == 0) {
            let addToS = copper/100;
            silver = silver + addToS;
            copper = 0;
        }
        // final check
        if (silver >= 100) {
            silver = parseFloat(silver/100)
            let addToGold = parseFloat(silver.toString().split(".")[0]);
            let newSil = parseFloat(silver.toString().split(".")[1]);
            silver = newSil;
            gold = gold + addToGold;
        }
       
        // display total profit
        $("#profitg").val(gold);
        $("#profits").val(silver);
        $("#profitc").val(copper);

    }); // end of click() - calculate button

    // Event handler for click event of Clear button
    $("#clear").click(function() {
        $("#item").val("");
        $("#item").next().text("");
        $("#gold").val("");  
        $("#silver").val("");
        $("#copper").val("");
        $("#quantity").val("");
        $("#quantity").next().text("");
        $("#profitg").val("");
        $("#profits").val("");
        $("#profitc").val("");
    }); // end of click() - clear button

}); // end ready()