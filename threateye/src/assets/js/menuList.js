/*export const setMenuList = (menuList) => {

  let auth = [];

  let menu = menuList.filter(function (value,ley) {

    let id = value.id;

    auth.push(id);

    if(id == '1'){
      value.path = 'home';
      //value.iconImg = 'delete';
      if(value.child_menu){
        value.child_menu.filter(function (val,key) {

          auth.push(val.id);

          if(val.id == '104'){
             val.path = '/home/overview';
          }else if(val.id == '109'){
             val.path = '/home/screen';
          }
        })
      }
      return value;
    } else if(id =='11'){
      value.path = 'handle';
      //value.iconImg = 'help';
      if(value.child_menu){
        value.child_menu.filter(function (val,key) {
          auth.push(val.id);
          if(val.id == '12'){
            val.path = '/handle/handle1';
          }
        })
      }
      return value;
    }else if(id =='27'){
      value.path = 'emerge';
      //value.iconImg = 'picture-outline';
      if(value.child_menu){
        value.child_menu.filter(function (val,key) {
          auth.push(val.id);
          if(val.id == '28'){
            val.path = '/emerge/network';
          }else if(val.id == '32'){
            val.path = '/emerge/terminal';
          }else if(val.id == '36'){
            val.path = '/emerge/journal';
          }
        })
      }
      return value;
    }else if(id =='68'){
      value.path = 'invest';
      //value.iconImg = 'camera';
      if(value.child_menu){
        value.child_menu.filter(function (val,key) {
          auth.push(val.id);
          if(val.id == '75'){
            val.path = '/invest/invest1';
          }
        })
      }
      return value;
    }else if(id =='74'){
      value.path = 'report';
      //value.iconImg = 'bell';
      if(value.child_menu){
        value.child_menu.filter(function (val,key) {
          auth.push(val.id);
          if(val.id == '79'){
            val.path = '/report/report1';
          }
        })
      }
      return value;
    }else if(id =='88'){
      value.path = 'system';
      //value.iconImg = 'view';
      if(value.child_menu){
        value.child_menu.filter(function (val,key) {
          auth.push(val.id);
          if(val.id == '114'){
            val.path = '/system/system1';
          }
        })
      }
      return value;
    }
  });

  return {menu,auth};

}*/


export const formatList = (asynRoutes,auths) => {

  return asynRoutes.filter(route =>{
    /*for(let value of auths){
      if(value.id == route.meta.auth){
        if(route.children){
          route.children = formatList(route.children,value.child_menu);
        }
        return true;
        break;
      }
    }*/
    if(auths.includes(route.meta.auth)){
      if(route.children){
          route.children = formatList(route.children,auths);
      }
      return true;
    }
  })

}
