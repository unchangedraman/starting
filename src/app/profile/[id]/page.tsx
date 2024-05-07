// to get any params request we need to make a folder from which url you want to access like in case of profile then profile ke andar ek [] bracket me kuchh kia
// then usko page.tsx se wrap kr diya and that it.

export default function userprofile({params} : any)
{
    return(
        <div>
            <h1>Profile</h1>
            <hr>
            </hr>
            <p> kuchh frontend bhi seekh le bc {params.id}</p>
        </div>
    )
}