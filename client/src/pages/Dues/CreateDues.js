import { TextField } from '@mui/material';



function Dues(){
    
    const [form, setForm] = useState({
        homeId: '',
        hoaId: '',
        amount: '',
        paiduntil: ''
    });

    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev; 
    });}

    async function Submit(e){
        e.preventDefault();

        try{
            // Login
            await axios
            .post(
                `dues`,
                JSON.stringify({ 
                    hoaId: form.hoaId,
                    homeId: form.homeId,
                    amount: form.amount,
                    paidUntil: form.paiduntil
                })
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                alert("Dues Set Successfully!");
                navigate("/homes");
            })
        }
        catch(err){
            alert("Invalid Input!");
            console.error(err.message);
        }

    }

    return(
        <div>
            <form onSubmit={Submit}>
                <TextField
                    id="filled-password-input"
                    label="amount"
                    type="text"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={(e)=>updateForm({ amount: e.target.value })}
                />
                <TextField
                    id="filled-password-input"
                    label="amount"
                    type="text"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={(e)=>updateForm({ amount: e.target.value })}
                />
            </form>
        </div>
    )
}