import getConfig, { Operation } from "../config"

// Test for default operation (Print) with no arguments
test("Simple print all", function(){
    const config = getConfig({})

    expect(config.operation).toEqual(Operation.Print);
    expect(config.args).toEqual([])
})

// Test for Print operation with one argument
test("Print key", function(){
    const config = getConfig({
        args: ["foo"],
    })

    expect(config.operation).toEqual(Operation.Print);
    expect(config.args).toEqual(["foo"])
})

// Test for Add operation with correct number of arguments
test("add key value", function(){
    const config = getConfig({
        args: ["add", "foo", "bar"],
    })

    expect(config.operation).toEqual(Operation.Add);
    expect(config.args).toEqual(["foo", "bar"])
})

// Test for Remove operation with correct number of arguments
test("remove key", function(){
    const config = getConfig({
        args: ["rm", "foo"],
    })

    expect(config.operation).toEqual(Operation.Remove);
    expect(config.args).toEqual(["foo"])
})

// Test for Add operation with incorrect number of arguments
test("add key value with incorrect args", function(){
    expect(() => getConfig({
        args: ["add", "foo"],
    })).toThrowError("Expected 2 arguments but got 1 number of args")
})

// Test for Remove operation with incorrect number of arguments
test("remove key with incorrect args", function(){
    expect(() => getConfig({
        args: ["rm"],
    })).toThrowError("Expected 1 arguments but got 0 number of args")
})

// Test for Print operation with more than one argument
test("Print key with too many args", function(){
    expect(() => getConfig({
        args: ["foo", "bar"],
    })).toThrowError("Expected 0 or 1 arguments but got 2 number of args")
})

// Test for getPwd with provided pwd
test("getPwd with provided pwd", function(){
    const config = getConfig({
        pwd: "/custom/path"
    })

    expect(config.pwd).toEqual("/custom/path")
})

// Test for getPwd with default pwd
test("getPwd with default pwd", function(){
    const config = getConfig({})

    expect(config.pwd).toEqual(process.cwd())
})

// Test for getConfig with provided config path
test("getConfig with provided config path", function(){
    const config = getConfig({
        pwd: "/custom/config/path"
    })

    expect(config.config).toEqual("/custom/config/path")
})

// Test for getConfig with default config path
test("getConfig with default config path", function(){
    process.env["HOME"] = "/home/user"
    const config = getConfig({})

    expect(config.config).toEqual("/home/user/.projector.json")
})

// Test for getConfig with XDG_CONFIG_HOME
test("getConfig with XDG_CONFIG_HOME", function(){
    process.env["XDG_CONFIG_HOME"] = "/home/user/.config"
    const config = getConfig({})

    expect(config.config).toEqual("/home/user/.config/projector/projector.json")
})