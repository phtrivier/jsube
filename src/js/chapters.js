var g_chapters_i18n = {
    en : { "chapter.choose" : "Choose a chapter" },
    fr : { "chapter.choose" : "Choisissez un chapitre" } 
};

var CHAPTERS = [{ title : { en : "Tutorial", fr : "Tutoriel"},
		  url : "tutorial.html"},
                { title : { en : "Begining", fr : "D&eacute;but"},
		  url : "chapter1.html"}];

function build_chapter_list_structure(lg) {

    var choose = g_chapters_i18n[lg]["chapter.choose"];

    // TODO(pht) : DRY this
    $("title").empty();
    $("title").append("Ube - " + choose);
    $("body").append("<div id='wrapper'></div>");
    $("#wrapper").append("<div id='main'></div>");
    $("#main").append("<h2>" + choose + "</h2>");
    $("#main").append("<ul id='chapters'></ul>");
    $("body").append("<div id='footer'>Copyright (C) Pierre-Henri Trivier 2010</div>")
}

function build_chapter_list() {
    var lg = get_lg();
    build_chapter_list_structure(lg);

    $.each(CHAPTERS, function (index, item) {
	var title = item['title'][lg];
	var url = item['url'];
	var a = $("<a href='" + url + "'></a>");
	a.append(title);
	var li = $("<li></li>");
	li.append(a);
	$("#chapters").append(li);
    });
}
