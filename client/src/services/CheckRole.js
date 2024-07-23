export default function CheckRole() {
    var user=JSON.parse(localStorage.getItem("user"));
    if(!user){
        return;
    }
    return user.role;
}
