import React, { useState } from 'react';
import './Connexion.css';


const Connexion = ({connexion, connexionSetter}) => {

    const[erreur, erreurSetter] = useState(false); // bool

    async function LogMe(emailParam, passeParam)
    {
        const response = await fetch('http://localhost:3000/login/?' + new URLSearchParams({email:emailParam, passe:passeParam}))
            .then(res => {
                if (res.ok) 
                {
                    return res.json();
                }
                else 
                {
                    throw new TypeError("No fetch data");
                }
            })
            .catch(err => "erreur");

        return response;
    }

    function ClickSubmit(e)
    {
        e.preventDefault();

        const DOMform = document.getElementById('DOMform');

        let email = DOMform.email.value;
        let passe = DOMform.passe.value;

        LogMe(email, passe)
            .then(data => 
                {
                    // console.log(data);
                    if(data.data == null)
                    {
                        // DOMoutput.textContent = "Utilisateur inconnu.";
                        erreurSetter(!erreur);
                    }
                    else
                    {
                        connexionSetter(true);
                        console.log(`Utilisateur trouvé : ${data.data.prenom} ${data.data.nom}.`);
                    }
                });

    }

    function BackForm(e)
    {
        erreurSetter(!erreur);
    }

    let content;
    if(!erreur)
    {
        content = 
        <div>
            <form id="DOMform" onSubmit={ClickSubmit}> 
                <input type="text" name="email" placeholder='exemple@exemple.com'/>
                <input type="password" name="passe" placeholder='mot de passe'/>
                <input type="submit" value="Valider"/>
            </form>
        </div>;
    }
    else
    {
        content=
        <div>
            <p>Identifiant inconnu</p>
            <button onClick={BackForm}>Retour</button>
        </div>;
    }


    return (
        content
    );
};


export default Connexion;