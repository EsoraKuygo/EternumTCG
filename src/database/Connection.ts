import { DataSource } from "typeorm";
import dataSourceOptions from "./DataSourceOptions";

export default class Connection {
  private static instance: Connection | null = null;
  private static initializing: Promise<void> | null = null;
  private dataSource: DataSource = new DataSource(dataSourceOptions);

  private constructor() {}

  static async getInstance(): Promise<Connection> {
    console.log(dataSourceOptions);
    if (this.instance == null) {
      if (!this.initializing) {
        this.initializing = (async () => {
          const instance = new Connection();
          await instance.dataSource.initialize();
          this.instance = instance;
          this.initializing = null;
        })();
      }
      await this.initializing;
    }
    if (!this.instance) {
      throw new Error("Failed to initialize Connection");
    }
    return this.instance;
  }

  getDataSource() {
    if (!this.dataSource.isInitialized) {
      throw new Error("DataSource not initialized");
    }
    return this.dataSource;
  }
}
