import Config from 'libs/helpers/config/Config'


describe('Test Configuration Class',()=>{
    it ('It populates with defaults when no config is sent',()=>{
        Config.load();
        let actualConfig=Config.values;
        expect(actualConfig['header']['month']['style']['backgroundColor']).toBe('#333333')
    })
    it ('It populates with defaults when no config is sent',()=>{
        let newvalues={header:{month:{style:{backgroundColor:"yellow"}}}}
        Config.load(newvalues);
        let actualConfig=Config.values;
        expect(actualConfig['header']['month']['style']['backgroundColor']).toBe('yellow')
        expect(actualConfig['header']['dayOfWeek']['style']['backgroundColor']).toBe('chocolate')
    })
})