import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoader";
import styles from "../styles/Home.module.css";
import { Character, GetCharacterResults } from "../types";

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {characters.map((character) => {
        return (
          <div key={character.id}>
             <Link href={`/characters/${character.id}`}>
              
                <h3>{character.name}</h3>
              
            </Link>
        
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
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const res = await fetch("https://rickandmortyapi.com/api/character/");
  console.log("res", res);
  const { results }: GetCharacterResults = await res.json();

  return {
    props: {
      characters: results,
    },
  };
};

export default Home;
