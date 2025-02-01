import { Operation } from "../config";
import Projector from "../projector";

function getMockData() {
    return {
        projecter: {
            "/": {
                "home": "rootHome",
                "pet": "dog is friendly"
            },
            "/home": {
                "home": "subHome"
            },
            "/home/room": {
                "home": "roomHome"
            }
        }
    };
}

function createProjector(currentPath: string, data = getMockData()): Projector {
    return new Projector({
        args: [],
        operation: Operation.Print,
        pwd: currentPath,
        config: "Hello there"
    }, data);
}

test("getValueAll should return correct values for the given path", () => {
    const projector = createProjector("/home/room");
    const value = projector.getValueAll();
    expect(value).toEqual({
        "pet": "dog is friendly",
        "home": "roomHome"
    });
});

test("getValue should return correct value for the given path", () => {
    const projector = createProjector("/home/room");

    const value = projector.getValue("home");
    expect(value).toEqual("roomHome");

    const value2 = projector.getValue("pet");
    expect(value2).toEqual("dog is friendly");
});

test("getValue should return correct value for the parent path", () => {
    const projector = createProjector("/home");

    const value = projector.getValue("home");
    expect(value).toEqual("subHome");

    const value2 = projector.getValue("pet");
    expect(value2).toEqual("dog is friendly");
});

test("getValue should return correct value for the root path", () => {
    const projector = createProjector("/");

    const value = projector.getValue("home");
    expect(value).toEqual("rootHome");

    const value2 = projector.getValue("pet");
    expect(value2).toEqual("dog is friendly");
});

//tests for setValue
test("setValue should set value for the given path", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("home", "newRoomHome");
    const value = projector.getValue("home");
    expect(value).toEqual("newRoomHome");

    projector.setValue("pet", "cat is friendly");
    const value2 = projector.getValue("pet");
    expect(value2).toEqual("cat is friendly");

    const projector2 = createProjector("/", data);
    expect(projector2.getValue("pet")).toEqual("dog is friendly");
});

test("setValue should create new key if it does not exist", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("newKey", "newValue");
    const value = projector.getValue("newKey");
    expect(value).toEqual("newValue");
});

test("setValue should overwrite existing key", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("home", "newRoomHome");
    const value = projector.getValue("home");
    expect(value).toEqual("newRoomHome");
});

test("setValue should not affect other paths", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("home", "newRoomHome");
    const projector2 = createProjector("/home", data);
    const value = projector2.getValue("home");
    expect(value).toEqual("subHome");
});

//test cases for removeValue

test("removeValue should remove key for the given path", () => {
    const projector = createProjector("/home/room");
    projector.removeValue("pet");
    const value = projector.getValue("pet");
    expect(value).toEqual("dog is friendly");

    projector.removeValue("home");
    const value2 = projector.getValue("home");
    expect(value2).toEqual("subHome");
});
