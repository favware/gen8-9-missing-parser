import { fetch, FetchResultTypes } from "@sapphire/fetch";
import { Result } from "@sapphire/result";
import { sleep } from "@sapphire/utilities";
import { writeFile } from "node:fs/promises";
import gen8Formats from "./formats-gen8.json" assert { type: "json" };
import gen9Formats from "./formats-gen9.json" assert { type: "json" };

const list1 = [];

for (const [key, value] of Object.entries(gen9Formats)) {
  if (
    (key.endsWith("mega") && key !== "yanmega") ||
    key.endsWith("totem") ||
    key.endsWith("alola") ||
    key.endsWith("primal") ||
    key === "castformsunny" ||
    key === "castformrainy" ||
    key === "castformsnowy" ||
    key === "deoxysattack" ||
    key === "deoxysdefense" ||
    key === "deoxysspeed" ||
    key === "charizardmegax" ||
    key === "charizardmegay" ||
    key === "floetteeternal" ||
    key === "greninjaash" ||
    key === "mewtwomegax" ||
    key === "mewtwomegay" ||
    key === "miniormeteor" ||
    key === "necrozmaultra" ||
    key === "pichuspikyeared" ||
    key === "pikachubelle" ||
    key === "pikachucosplay" ||
    key === "pikachulibre" ||
    key === "pikachuphd" ||
    key === "pikachupopstar" ||
    key === "pikachurockstar" ||
    key === "shayminsky" ||
    key === "wormadamsandy" ||
    key === "wormadamtrash"
  ) {
    continue;
  }

  const gen8entryForPokemon = gen8Formats[key];

  if (gen8entryForPokemon) {
    if (
      value.toLowerCase() === "past" &&
      gen8entryForPokemon.toLowerCase() === "past"
    ) {
      list1.push(key);
    }
  }
}

const list2 = [];

for (const mon of list1) {
  const result = await Result.fromAsync(
    fetch(
      `https://www.serebii.net/pokedex-swsh/${mon}`,
      FetchResultTypes.Result
    )
  );

  console.group(mon);
  console.log("is error: ", result.isErr());
  await sleep(500);

  if (result.isErr()) {
    const unwrapped = result.unwrapErr();
    console.log(unwrapped.status);
    console.groupEnd();
    list2.push(mon);
  }

  console.groupEnd();
  continue;
}

await writeFile("./both-gens-past.txt", list2.join("\n"));
