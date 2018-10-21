const Sqlite = require("nativescript-sqlite");

export default class BetDb {

  sqlScripts() {
    // all table create sql 
    this.betSql = `CREATE TABLE IF NOT EXISTS bet ( 
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT, 
      "date"	TEXT, 
      "stake"	NUMERIC NOT NULL DEFAULT 0,
      "return"	NUMERIC NOT NULL DEFAULT 0, 
      "status"	INTEGER, 
      "note"	TEXT
      );`;
    this.betDetailSql = `CREATE TABLE IF NOT EXISTS bet_detail (
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
      "bet_id"	INTEGER NOT NULL,
      "bet_type"	INTEGER,
      "odd"	NUMERIC,
      "sport_type"	INTEGER,
      "home"	TEXT,
      "away"	TEXT,
      "status"	INTEGER, 
      CONSTRAINT BET_ID_FK FOREIGN KEY (bet_id) REFERENCES bet (id)
      );`;

    this.gameSql = `CREATE TABLE IF NOT EXISTS game (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "country"	TEXT,
        "sport"	TEXT,
        "home"	TEXT,
        "away"	TEXT,
        "game_time"	INTEGER,
        "game_result"	TEXT
      );`;


    this.betInsert = "INSERT INTO bet (date,stake,return,status,note) VALUES(datetime('now', 'localtime'),?,?,?,?)";
    this.betDetailInsert = `INSERT INTO bet_detail (bet_id,bet_type,odd,sport_type,home,away,status)  VALUES(?,?,?,?,?,?,?);`;

    // reports
    this.allFinishedStakeReturn = "select sum(stake) ,sum(return) from bet where status=0 or status=2";
    this.allStatusCount = "select status,count(*) from bet group by status;"

  }

  constructor() {

    this.sqlScripts();
    this.sqllite = null;

  }

  report1(callback) {
    let promise = this.sqllite.get(this.allFinishedStakeReturn, []);
    //let b=this;
    promise.then(function (row) {
      callback(row);
    });
  }

  report2(callback) {

    let r = [];
    let promise = this.sqllite.each(this.allStatusCount, [], function (err, row) {
      r.push({
        "id": row[0],
        "count": row[1]
      });
    });
    callback(r);

  }

  init(callback) {

    let db_promise = (new Sqlite("my.db"));

    db_promise.then((db) => {
      this.sqllite = db;
      console.log("sqllite", this.sqllite);

      if (TNS_ENV !== 'production') {

        this.sqllite.execSQL("DROP TABLE IF EXISTS bet_detail").then(() => {

          console.log("bet_detail table dropped");

          this.sqllite.execSQL("DROP TABLE IF EXISTS game").then(() => {

            console.log("bet_detail table dropped");
  
          this.sqllite.execSQL("DROP TABLE IF EXISTS bet").then(() => {

            console.log("bet table dropped");

            this.sqllite.execSQL(this.betSql).then(() => {
              console.log("bet table created");

              this.sqllite.execSQL(this.gameSql).then(() => {
                console.log("game table created");

                this.sqllite.execSQL(this.betDetailSql).then(() => {
                  console.log("bet_detail table created");

                  let iter = 0

                  while (iter < 10) {
                    this.insertSampleData(100, 260, 0, null);
                    this.insertSampleData(100, 0, 2, null);
                    this.insertSampleData(100, 130, 1, null);
                    this.insertSampleData(100, 150, 0, null);
                    this.insertSampleData(100, 0, 2, null);
                    this.insertSampleData(100, 0, 2, null);
                    this.insertSampleData(100, 190, 1, null);
                    this.insertSampleData(100, 190, 2, null);
                    this.insertSampleData(113, 123.44, 0, null);
                    this.insertSampleData(1230, 1465.67, 0, null);
                    this.insertSampleData(100, 190, 0, null);
                    iter++;
                  }

                  this.insertSampleData(100, 190, 0, callback);

                }, e => console.log("create table error", e));
              }, e => console.log("create table error", e));
            }, e => console.log("create table error", e));
          }, e => console.log("drop table error", e));
        }, e => console.log("drop table error", e));
      }, e => console.log("drop table error", e));

      } else {

        //TODO for now this is duplication
        this.sqllite.execSQL(this.betSql).then(() => {
          console.log("bet table created");
          this.sqllite.execSQL(this.gameSql).then(() => {
            console.log("game table created");
            this.sqllite.execSQL(this.betDetailSql).then(() => {
              console.log("bet_detail table created");

              //last thing is callback
              callback();
            }, e => console.log("create table error", e));
          }, e => console.log("create table error", e));
        }, e => console.log("create table error", e));

      }

    }, e => console.log("OPEN DB ERROR", error));

  }

  insertSampleData(stake, returnn, status, callback) {

    let betSql = `INSERT INTO bet (date,stake,return,status,note) VALUES(datetime('now', 'localtime'),${stake},${returnn},${status},'Ezici galibiyet')`;

    this.sqllite.execSQL(betSql).then((id) => {
      console.log(`bet created with id ${id}`)
      let bet_detailSql = `INSERT INTO bet_detail (bet_id,bet_type,odd,sport_type,home,away,status)  
            VALUES(${id},0,1.5,0,'Beşiktaş','Fenerbahçe',1),(${id},0,1.6,0,'Beşiktaş','Galatasaray',1),
            (${id},0,1.6,0,'Fenerbahçe','Galatasaray',1);`;
      this.sqllite.execSQL(bet_detailSql).then((id) => {
        console.log("a sample data created.");
        if (callback !== null) {
          callback();
        }
      }, (e) => {
        console.log("INSERT ERROR", e);
      });
    }, (e) => {
      console.log("INSERT ERROR", e);
    });

  }

  genGame(row) {

    let game = {};
    game.id = row[0];
    game.country = row[1];
    game.sport = row[2];
    game.home = row[3];
    game.away = row[4];
    let gametime= new Date(row[5]);
    game.time = gametime.getHours()+":"+gametime.getMinutes();
    game.result = row[6];
    return bet;

  }

  genBet(row) {

    let bet = {};
    bet.id = row[0];
    bet.date = row[1];
    bet.stake = row[2];
    bet.return = row[3];
    bet.status = row[4];
    bet.note = row[5];
    return bet;

  }

  genBetD(row) {

    let dt = {};
    dt.id = row[0];
    dt.bet_id = row[1];
    dt.bet_type = row[2];
    dt.odd = row[3];
    dt.sport_type = row[4];
    dt.home = row[5];
    dt.away = row[6];
    dt.status = row[7];
    return dt;

  }

  betList() {
    let r = [];
    let b = this;
    let promise = this.sqllite.each('select * from bet ', [], function (err, row) {
      r.push(b.genBet(row));
    });

    /** promise.then(function (count) {
      console.log("Rows displayed:", count); // Prints 100  (Assuming their are a 100 rows found)
    });**/

    return r;
  }

  gameList() {
    let r = [];
    let b = this;
    let promise = this.sqllite.each('select * from game ', [], function (err, row) {
      r.push(b.genGame(row));
    });

    /** promise.then(function (count) {
      console.log("Rows displayed:", count); // Prints 100  (Assuming their are a 100 rows found)
    });**/

    return r;
  }

  betListF() {
    let r = [];
    let b = this;
    let promise = this.sqllite.each('select * from bet ', [], function (err, row) {
      let bet = b.genBet(row);
      let details = b.betDList(bet.id);
      bet.details = details;
      r.push(bet);
    });

    /** promise.then(function (count) {
      console.log("Rows displayed:", count); // Prints 100  (Assuming their are a 100 rows found)
    });**/

    return r;
  }

  betListL(limit, offset) {
    let r = [];
    let b = this;
    let promise = this.sqllite.each('select * from bet limit ? offset ?', [limit, offset], function (err, row) {
      let bet = b.genBet(row);
      let details = b.betDList(bet.id);
      bet.details = details;
      r.push(bet);
    });

    /** promise.then(function (count) {
      console.log("Rows displayed:", count); // Prints 100  (Assuming their are a 100 rows found)
    });**/

    return r;
  }

  betCount() {

    let r = 0;

    this.sqllite.each('select count(id) from bet ', [], function (err, row) {
      //TODO what happens for no row
      r = row[0];
    });

    return r;

  }

  betDList() {
    let r = [];
    let b = this;
    let promise = this.sqllite.each('select * from bet_detail ', [], function (err, row) {
      r.push(b.genBetD(row));
    });

    /** promise.then(function (count) {
      console.log("Rows displayed:", count); // Prints 100  (Assuming their are a 100 rows found)
    });*/
    return r;
  }

  betDList(bet_id) {
    let r = [];
    let b = this;
    let promise = this.sqllite.each('select * from bet_detail where bet_id=?', [bet_id], function (err, row) {
      r.push(b.genBetD(row));
    });

    /** promise.then(function (count) {
      console.log("Rows displayed:", count); 
    });*/
    return r;
  }

  getBet(id, callback) {
    let promise = this.sqllite.get('select * from bet where id=?', [id]);
    let b = this;
    promise.then(function (row) {
      callback(b.genBet(row));
    });
  }

  getFullBet(id, callback) {
    let promise = this.sqllite.get('select * from bet where id=?', [id]);
    let b = this;
    promise.then(function (row) {
      let bet = b.genBet(row);
      bet.details = b.betDList(id)
      callback(bet);
    });
  }

  getBetD(id, callback) {
    let promise = this.sqllite.get('select * from bet_detail where id=?', [id]);
    let b = this;
    promise.then(function (row) {
      callback(b.genBetD(row));
    });
  }

  saveBet(bet) {

    let promise = this.sqllite.execSQL(this.betInsert, [bet.stake, bet.return, bet.status, bet.note]);
    let b = this;
    promise.then(function (id) {

      // console.log("The new record id is:", id);
      for (let key in bet.details) {
        let detail = bet.details[key];
        console.log("detail-->" + detail.home);
        b.saveBetDetail(id, detail);
      }

    });

  }
  saveBetDetail(bet_id, detail) {

    let d_promise = this.sqllite.execSQL(this.betDetailInsert, [bet_id, detail.bet_type, detail.odd, detail.sport_type, detail.home, detail.away, detail.status]);
    d_promise.then(function (id) {
      console.log("The new record id is:", id);
    })

  }

  updateGames(callback){

    let url = 'http://10.0.2.2:8080/result.json';

    fetch(url).then(res => res.json())
    .then((out) => {
        console.log(out)
       callback(out)
     }).catch((err) => {
       //TODO callback error 
       throw err
    });

  }

}