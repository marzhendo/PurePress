export namespace main {
	
	export class Result {
	    OutputPath: string;
	    BeforeSize: number;
	    AfterSize: number;
	    Error?: string;
	
	    static createFrom(source: any = {}) {
	        return new Result(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.OutputPath = source["OutputPath"];
	        this.BeforeSize = source["BeforeSize"];
	        this.AfterSize = source["AfterSize"];
	        this.Error = source["Error"];
	    }
	}

}

