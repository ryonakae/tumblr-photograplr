(function($){
    $.fn.extend({
        jq_tumblrPostList: function(options){

            var defaults={
                api_key: "mVhQRZlQwEEnxrkRsHsupTzfjcUuWGVInzi1iRMJx4s0xihNqQ",
                domain: "stainless-note.tumblr.com",
                limit: 5,
                width: 250
            }
            var o = $.extend(defaults, options);
            var objList = this;
            //console.log(objList);
            return this.each(function() {

                $.getJSON(
                    "http://api.tumblr.com/v2/blog/"+o.domain+"/posts?api_key="+o.api_key+"&limit="+o.limit+"&jsonp=?",
                    function(data){
                        //console.log(data);
                        var post_no = 0;
                        if( data['meta']['status']==200){
            
                            $(objList).append('<ul class="tumblr_post_list"></ul>');
            
                            $.each(data['response']['posts'],function(){
                                post_no = post_no +1;
                                //var post_url = "http://"+o.domain+"/post/"+ this['id'];
                                var post_url = this['post_url'];
                                var post_class = 'postno_'+post_no;
                                
                                $(".tumblr_post_list",objList).append('<li class="tpl_post '+post_class+'"></li>');
                                
                                //タイトルの取得
                                if( this['title'] !== void 0 ){
                                    $('.'+post_class,objList).append('<div class="post_title" ><a href="' + post_url + '" >' + this['title'] + '</a></div>');
                                }
                                else if(this['photos'] === void 0 ){
                                    objDate = new Date(this['timestamp']*1000);
                                    date_str = (objDate.getMonth()+1) +"/" + objDate.getDate() +" ";
                                    date_str += (objDate.getHours()) +":" + objDate.getMinutes();
                                    $('.'+post_class,objList).append('<div class="post_title" ><a href="' + post_url + '" >' + date_str +':'+ this['type'] + '</a></div>');
                                }
                                
                                //画像の取得
                                if( this['photos'] !== void 0 && this['photos'].length > 0 ){
                                    //var img_url = this['original_size']['url'];
                                    for( var no=0; no < this['photos'][0]['alt_sizes'].length; no++ ){
                                        if( o.width <= this['photos'][0]['alt_sizes'][no]['width'] ){
                                            break;
                                        }
                                    }
                                    var img_url = this['photos'][0]['alt_sizes'][no]['url'];
                                    $('.'+post_class,objList).append('<div class="photo" ><a href="' + post_url + '" >' + '<img src="' + img_url + '" width="'+o.width+'" />' + '</a></div>');
                                    
                                }
                            });
            
                        }
                    }
                );
            });            
        }
    });
})(jQuery);
