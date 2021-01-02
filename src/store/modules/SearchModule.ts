import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import omdbService from "@/services/omdbService";
import Halfmoon from "@/helpers/Halfmoon";

@Module({ dynamic: true, namespaced: true, store, name: "SearchModule" })
class SearchModule extends VuexModule {
  public searchHistory = new Map();

  @Mutation
  private setSearchHistory(history: any) {
    this.searchHistory = history;
  }

  @Action
  public updateSearchHistory(history: any) {
    this.context.commit("setSearchHistory", history);
  }

  @Action
  public addSearchHistory(addition: any) {
    const newHistory = new Map(this.searchHistory);
    newHistory.set(addition["query"], addition["movies"]);
    this.context.commit("setSearchHistory", newHistory);
  }

  @Action
  public async getMovieByTitle(query: string): Promise<any[]> {
    if (this.searchHistory.has(query)) {
      return this.searchHistory.get(query);
    } else {
      try {
        const response = (
          await omdbService.get("", {
            params: { s: query, type: "movie", page: 1 },
          })
        ).data;
        const movies = response["Search"];
        const movieNames = new Set(movies.map((movie: any) => movie["Title"]));
        const movieCount = response["totalResults"];

        if (movieCount > 10) {
          setTimeout(async () => {
            for (let i = 2; i <= Math.ceil(movieCount / 10); i++) {
              const response = (
                await omdbService.get("", {
                  params: { s: query, type: "movie", page: i },
                })
              ).data;

              const newMovies = response["Search"];
              for (const movie of newMovies) {
                if (!movieNames.has(movie["Title"])) {
                  movies.push(movie);
                  movieNames.add(movie["Title"]);
                }
              }
              this.addSearchHistory({ query, movies });
            }
          });
        } else {
          this.addSearchHistory({ query, movies });
        }

        return movies;
      } catch (e) {
        console.error(e);
        Halfmoon.toastError({ content: "Could not get movies" });
        return [];
      }
    }
  }
}
export default getModule(SearchModule);
