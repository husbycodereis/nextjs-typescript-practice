import imageLoader from "../../imageLoader";
import { Character } from "../../types";
import {useRouter} from "next/router";
import Image from "next/image";
import { GetServerSideProps } from "next";

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();

  return (
    <div>
      <h1>{character.name}</h1>
      <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width="200"
        height="200"
      />
    </div>
  );
}



export const  getServerSideProps:  GetServerSideProps =  async (context)=> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();

  return {
    props: { character },
  };
}

export default CharacterPage;
