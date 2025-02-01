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

// Tests for getValueAll
test("getValueAll should return correct values for the given path", () => {
    const projector = createProjector("/home/room");
    const value = projector.getValueAll();
    expect(value).toEqual({
        "pet": "dog is friendly",
        "home": "roomHome"
    });
});

// Tests for getValue
test("getValue should return correct value for the given path", () => {
    const projector = createProjector("/home/room");
    expect(projector.getValue("home")).toEqual("roomHome");
    expect(projector.getValue("pet")).toEqual("dog is friendly");
});

test("getValue should return correct value for the parent path", () => {
    const projector = createProjector("/home");
    expect(projector.getValue("home")).toEqual("subHome");
    expect(projector.getValue("pet")).toEqual("dog is friendly");
});

test("getValue should return correct value for the root path", () => {
    const projector = createProjector("/");
    expect(projector.getValue("home")).toEqual("rootHome");
    expect(projector.getValue("pet")).toEqual("dog is friendly");
});

test("getValue should return undefined for non-existent key", () => {
    const projector = createProjector("/home/room");
    expect(projector.getValue("nonExistentKey")).toBeUndefined();
});

// Tests for setValue
test("setValue should set value for the given path", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("home", "newRoomHome");
    expect(projector.getValue("home")).toEqual("newRoomHome");

    projector.setValue("pet", "cat is friendly");
    expect(projector.getValue("pet")).toEqual("cat is friendly");

    const projector2 = createProjector("/", data);
    expect(projector2.getValue("pet")).toEqual("dog is friendly");
});

test("setValue should create new key if it does not exist", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("newKey", "newValue");
    expect(projector.getValue("newKey")).toEqual("newValue");
});

test("setValue should overwrite existing key", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("home", "newRoomHome");
    expect(projector.getValue("home")).toEqual("newRoomHome");
});

test("setValue should not affect other paths", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.setValue("home", "newRoomHome");
    const projector2 = createProjector("/home", data);
    expect(projector2.getValue("home")).toEqual("subHome");
});

// Tests for removeValue
test("removeValue should remove key for the given path", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.removeValue("home");
    expect(projector.getValue("home")).toEqual("subHome");
});

test("removeValue should not affect other paths", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.removeValue("home");
    const projector2 = createProjector("/", data);
    expect(projector2.getValue("home")).toEqual("rootHome");
});

test("removeValue should handle non-existent key gracefully", () => {
    let data = getMockData();
    const projector = createProjector("/home/room", data);
    projector.removeValue("nonExistentKey");
    expect(projector.getValue("nonExistentKey")).toBeUndefined();
});
