"use client";
import React, { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { UserAtom } from "../utils/atoms";
import { useAtomValue } from "jotai";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/services/mutations/updateUser";
import { GET_USER } from "@/services/query/user";

type Props = {};

export default function Setting({}: Props) {
  const userInfo = useAtomValue(UserAtom);
  const [token, setToken] = useState<string | null>(null); // État local pour le token
  const [userUpdate, setUserUpdate] = useState({
    mdp: "",
    pseudo: "",
    avatar: "",
  });
  useEffect(() => {
    // Lire le token de localStorage uniquement côté client
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);

    if (!userInfo) {
      console.warn("Les informations de l'utilisateur ne sont pas chargées");
    }
  }, [userInfo]);

  const [updateUser, { loading, data, error }] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [GET_USER],
    onCompleted(data) {
      alert("Profile mise à jour !");
    },
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserUpdate({ ...userUpdate, avatar: reader.result as string }); // Stocke l'image en base64
      };
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!userInfo) {
      alert(
        "Impossible de mettre à jour :  les informations utilisateur sont manquante"
      );
      return;
    }
    // Filtrer les valeurs vides
    const filteredUpdate = Object.fromEntries(
      Object.entries(userUpdate).filter(([_, value]) => value !== "")
    );
    if (Object.keys(filteredUpdate).length === 0) {
      alert("Aucune modification à envoyer.");
      return;
    }
    console.log(filteredUpdate);
    try {
      await updateUser({
        variables: {
          updateUserId: userInfo.id,
          input: filteredUpdate,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise  à jour ! :", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center jutify-center  m-auto w-lg mt-10">
        <Avatar
          src={userInfo?.avatar || "/bobMartin.svg"}
          width={100}
          height={100}
          alt="Bob"
        />
        <Input
          type="file"
          name="avatar"
          id="avatar"
          required={false}
          onChange={handleImageChange}
          className="text-redpapilles"
        />
        <div className="flex flex-col items-start text-left m-auto w-sm mt-10">
          <p className="text-redpapilles">Prénom: {userInfo?.prenom}</p>
          <p className="text-redpapilles">Nom: {userInfo?.nom}</p>
          <p className="text-redpapilles">E-mail: {userInfo?.email}</p>
        </div>
        <form autoComplete="off" onSubmit={handleUpdate}>
          <div className="flex flex-col m-4  m-auto w-sm mt-5">
            <Input
              autoComplete="false"
              className="w-96"
              label="Pseudo"
              type="text"
              value={userUpdate.pseudo}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, pseudo: e.target.value })
              }
              name="pseudo"
              id="pseudo"
              required={false}
            />
            <Input
              autoComplete="false"
              className="w-96"
              label="Mot de passe"
              type="password"
              value={userUpdate.mdp}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, mdp: e.target.value })
              }
              name="mdp"
              id="mdp"
              required={false}
            />
            <Button
              type="submit"
              txt="Mettre à jours"
              onClick={() => console.log("MAJ")}
              className="text-redpapilles w-60"
            />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
