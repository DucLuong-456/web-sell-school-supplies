
const MenuController = {
    getLienHe: async(req,res)=>{
        res.render('menu/lienhe');
    },
    getTuyenDung: async(req,res)=>{
        res.render('menu/tuyendung');
    }
    
}
module.exports = MenuController;