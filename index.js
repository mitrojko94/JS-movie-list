class Movies {
  constructor() {
    this.mondayList = [];
    this.tuesdayList = [];
    this.wednesdayList = [];
    this.thursdayList = [];
    this.fridayList = [];
    this.saturdayList = [];
    this.sundayList = [];
  }
  async getAllMovies() {
    let response = await fetch(
      "https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-in-theaters.json"
    );
    let json = await response.json();
    return json;
  }

  popuniFilmove() {
    let search_movie = document.getElementById("search").value;
    let json = this.getAllMovies();
    let divTag = document.getElementById("all-movies");
    divTag.innerHTML = "";
    let divRecommendedTag = document.getElementById("recommended-movies");
    divRecommendedTag.innerHTML = "";
    json.then((data) => {
      for (let movie of data) {
        if (movie.title.toLowerCase().includes(search_movie.toLowerCase())) {
          divTag.innerHTML +=
            movie.title +
            `<form onSubmit='return movies.addToList(event);'> <input type='submit'> <input type='hidden' name='title' value='${movie.title}'> <select name='day'> <option>Monday</option> <option>Tuesday</option> <option>Wednesday</option> <option>Thursday</option> <option>Friday</option> <option>Saturday</option> <option>Sunday</option> </select> </form>` +
            "<br>";
          if (movie.imdbRating > 7) {
            divRecommendedTag.innerHTML +=
              movie.title +
              `<form onSubmit='return movies.addToList(event);'> <input type='submit'> <input type='hidden' name='title' value='${movie.title}'> <select name='day'> <option>Monday</option> <option>Tuesday</option> <option>Wednesday</option> <option>Thursday</option> <option>Friday</option> <option>Saturday</option> <option>Sunday</option> </select> </form>` +
              "<br>";
          }
        }
      }
    });
  }

  addToList(event) {
    event.preventDefault();
    let title = event.target.elements.title.value;
    let day = event.target.elements.day.value;

    if (day == "Monday") {
      this.mondayList.push(title);
      console.log(this.mondayList);
    }
    if (day == "Tuesday") {
      this.tuesdayList.push(title);
      console.log(this.tuesdayList);
    }
    if (day == "Wednesday") {
      this.wednesdayList.push(title);
      console.log(this.wednesdayList);
    }
    if (day == "Thursday") {
      this.thursdayList.push(title);
      console.log(this.thursdayList);
    }
    if (day == "Friday") {
      this.fridayList.push(title);
      console.log(this.fridayList);
    }
    if (day == "Saturday") {
      this.saturdayList.push(title);
      console.log(this.saturdayList);
    }
    if (day == "Sunday") {
      this.sundayList.push(title);
      console.log(this.sundayList);
    }
    return true;
  }

  arrayToCsv(data) {
    return data
      .map(
        (row) =>
          row
            .map(String) // convert every value to String
            .map((v) => v.replaceAll('"', '""')) // escape double colons
            .map((v) => `"${v}"`) // quote it
            .join(",") // comma-separated
      )
      .join("\r\n"); // rows starting on new lines
  }

  downloadBlob(content, filename, contentType) {
    // Create a blob
    let blob = new Blob([content], { type: contentType });
    let url = URL.createObjectURL(blob);

    // Create a link to download it
    let pom = document.createElement("a");
    pom.href = url;
    pom.setAttribute("download", filename);
    pom.click();
  }

  exportData() {
    let rows = [
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    ];
    let mondaySize = this.mondayList.length;
    let tuesdaySize = this.tuesdayList.length;
    let wednesdaySize = this.wednesdayList.length;
    let thursdaySize = this.thursdayList.length;
    let fridaySize = this.fridayList.length;
    let saturdaySize = this.saturdayList.length;
    let sundaySize = this.sundayList.length;
    let max = Math.max(
      mondaySize,
      tuesdaySize,
      wednesdaySize,
      thursdaySize,
      fridaySize,
      saturdaySize,
      sundaySize
    );
    for (let i = 0; i < max; i++) {
      let row = [];
      if (i < mondaySize) {
        row.push(this.mondayList[i]);
      } else {
        row.push("");
      }
      if (i < tuesdaySize) {
        row.push(this.tuesdayList[i]);
      } else {
        row.push("");
      }
      if (i < wednesdaySize) {
        row.push(this.wednesdayList[i]);
      } else {
        row.push("");
      }
      if (i < thursdaySize) {
        row.push(this.thursdayList[i]);
      } else {
        row.push("");
      }
      if (i < fridaySize) {
        row.push(this.fridayList[i]);
      } else {
        row.push("");
      }
      if (i < saturdaySize) {
        row.push(this.saturdayList[i]);
      } else {
        row.push("");
      }
      if (i < sundaySize) {
        row.push(this.sundayList[i]);
      } else {
        row.push("");
      }
      rows.push(row);
    }
    let csv = this.arrayToCsv(rows);
    this.downloadBlob(csv, "export.csv", "text/csv;charset=utf-8;");
  }
}

movies = new Movies();
movies.popuniFilmove();
