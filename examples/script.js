
$().ready(function() {
  $("#menu a").click(function(e) {
    e.preventDefault();
    $("#content").attr('src', $(this).attr("href"));
  });
});
