import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $mdp: String!){
    loginUser(email: $email, mdp: $mdp) {
        token
        user{
            id
            email
            nom
            prenom
        }
    }
}
`