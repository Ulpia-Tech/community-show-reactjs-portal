export const UserForm = () => {

    return <>
    
    <div className="mt16">

        <div className="flex">
            <div className="mr32">
                <label className="input-label mt16" htmlFor="username">First Name</label>
                <input 
                    className="input-text mt8" 
                    id="username"
                    name="FirstName"
                    value={activeEntity?.FirstName}
                    onChange={ handleChange }
                    type="text"/>
            </div>
            
            <div>
                <label className="input-label mt16" htmlFor="password">Last Name</label>
                <input 
                    className="input-text mt8" 
                    id="password" 
                    name="LastName"
                    value={activeEntity?.LastName} 
                    onChange={ handleChange }
                    type="text"/>
            </div>
        </div>
        </div>

        <div className="mt16">
        <label className="input-label mt16" htmlFor="email">Phone</label>
        <input
            className="input-text mt8" 
            id="email" 
            name="Phone"
            value={activeEntity?.Phone} 
            onChange={ handleChange }
            type="text"/>
        </div>                


        <div className="mt16">
        <label className="input-label mt16" htmlFor="email">E-mail</label>
        <input 
            className="input-text mt8" 
            id="email" 
            name="Email"
            value={activeEntity?.Email} 
            onChange={ handleChange }
            type="text"/>
        </div>                

        <div className="mt16">
        <div onClick={ processEntityUpdate } className="button">Update</div>
        </div>    


    
    </>

}