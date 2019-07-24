describe ('Thermostat', function() {

  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat;
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.temperature).toEqual(20)
  });

  it('minimum temperature is 10 degrees', function() {
    expect(thermostat.minTemp).toEqual(10)

  })

  it('has power save on as default', function(){
    expect(thermostat.isPowerSave).toEqual(true)
  })

  describe('.up', function() {
    it('increases temperature by 1', function(){
      thermostat.up()
      expect(thermostat.temperature).toEqual(21)

    });

    it('raises error when temperature is higher than maxTemp', function() {
      thermostat.temperature = thermostat.maxTemp
      expect(function() {thermostat.up()}).toThrowError('Max temperature reached')

    })
  });

  describe('.down', function() {
    it('decreases temperature by 1', function(){
      thermostat.down()
      expect(thermostat.temperature).toEqual(19)

    });

    it('raises an error when temperature hits 9 degrees', function() {
      for (var i = 1; i <= 10; i++ ) {
        thermostat.down();
      }
      expect(function(){thermostat.down();}).toThrowError('Minimum temperature reached');
    });

  });

  describe('.powerSaveOn', function() {
    it('Changes maxTemp to 25', function(){
      thermostat.powerSaveOn();
      expect(thermostat.maxTemp).toEqual(25);
    })

    it('Changes isPowerSave to true', function() {
      thermostat.powerSaveOn();
      expect(thermostat.isPowerSave).toEqual(true);

    })

  })

  describe('.powerSaveOff', function(){
    it('Changes maxTemp to 32', function(){
      thermostat.powerSaveOff();
      expect(thermostat.maxTemp).toEqual(32);
    });

    it('Changes isPowerSave to false', function() {
      thermostat.powerSaveOff();
      expect(thermostat.isPowerSave).toEqual(false);

    });

  });

  describe('.reset', function(){
    it('resets temperature to 20', function(){
      thermostat.reset();
      expect(thermostat.temperature).toEqual(20);
    });

  });

  describe('.energyUse', function(){
    it('shows low usage if temperature < 18', function(){
      thermostat.temperature = 17;
      expect(thermostat.calculateEnergyUse()).toEqual('low-usage')
    });
    it('shows medium usage if temperature is between 18 and 24 inclusive', function(){
      thermostat.temperature = 22;
      expect(thermostat.calculateEnergyUse()).toEqual('medium-usage')
    });
    it('shows high usage if temperature > 24', function(){
      thermostat.powerSaveOff;
      thermostat.temperature = 30;
      expect(thermostat.calculateEnergyUse()).toEqual('high-usage')
    });
  });

});
