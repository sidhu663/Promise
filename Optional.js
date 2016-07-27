const Optional = function(v) {
	let value = (typeof v === 'undefined' || v === null) ? [] : [v];

  this.isEmpty = !value.length;
  this.getOrElse = defaultValue => this.isEmpty ? defaultValue : value[0];
  this.map = f => new Optional(value.map(f)[0]);
  this.filter = f => new Optional(value.filter(f)[0]);
  this.flatten = () => (value[0] instanceof Optional ? value[0] : this);
 	this.flatMap = f => this.map(f).flatten();
 
  this.orElse = otherOption => {
		if (!(otherOption instanceof Optional)) {
    	throw "Provided argument is not instance of Optional";
    }
    
    return this.isEmpty ? otherOption : this;
  }
  
	this.get = value[0];
}
