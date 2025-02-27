class Duck {

    static #legRadius = 2;
    static #platformHeight = 10;
    static #drawSpecificPart = true;

    static toggleDrawing() {
        this.#drawSpecificPart = !this.#drawSpecificPart;
    }

    static #updateSlider(variableName, newValue) {
        const textElement = document.getElementById(variableName + 'Text');
        if (textElement) {
            textElement.innerHTML = newValue;
        }

        const slider = document.getElementById(variableName + 'Slider');
        if (slider) {
            slider.value = newValue;
        }

        console.log("Cannot update slider for: " + variableName);
    }

    static random() {

        // BODY
        ProjectData.BodyWidth = Math.round(random(50, 80)); this.#updateSlider('bodyWidth', ProjectData.BodyWidth);
        ProjectData.BodyHeight = Math.round(random(40, 60)); this.#updateSlider('bodyHeight', ProjectData.BodyHeight);
        ProjectData.BodyLength = Math.round(random(60, 120)); this.#updateSlider('bodyLength', ProjectData.BodyLength);

        // WING
        ProjectData.WingWidth = Math.round(random(3, 10)); this.#updateSlider('wingWidth', ProjectData.WingWidth);
        ProjectData.WingHeight = Math.round(random(ProjectData.BodyHeight * 0.4, ProjectData.BodyHeight * 0.6)); this.#updateSlider('wingHeight', ProjectData.WingHeight);
        ProjectData.WingLength = Math.round(random(ProjectData.BodyLength * 0.5, ProjectData.BodyLength * 0.7)); this.#updateSlider('wingLength', ProjectData.WingLength);

        // HEAD
        ProjectData.HeadWidth = Math.round(random(ProjectData.BodyWidth * 0.7, ProjectData.BodyWidth * 0.8)); this.#updateSlider('headWidth', ProjectData.HeadWidth);
        ProjectData.HeadHeight = Math.round(random(ProjectData.BodyHeight * 0.6, ProjectData.BodyHeight * 0.7)); this.#updateSlider('headHeight', ProjectData.HeadHeight);
        ProjectData.HeadLength = Math.round(random(ProjectData.HeadWidth * 0.9, ProjectData.HeadWidth * 1.1)); this.#updateSlider('headLength', ProjectData.HeadLength);

        // BEAK
        ProjectData.BeakWidth = Math.round(random(ProjectData.HeadWidth * 0.3, ProjectData.HeadWidth * 0.6)); this.#updateSlider('beakWidth', ProjectData.BeakWidth);
        ProjectData.BeakHeight = Math.round(random(2, 6)); this.#updateSlider('beakHeight', ProjectData.BeakHeight);
        ProjectData.BeakLength = Math.round(random(12, 24)); this.#updateSlider('beakLength', ProjectData.BeakLength);

        // TAIL
        ProjectData.TailWidth = Math.round(random(20, 30)); this.#updateSlider('tailWidth', ProjectData.TailWidth);
        ProjectData.TailHeight = Math.round(random(3, 6)); this.#updateSlider('tailHeight', ProjectData.TailHeight);
        ProjectData.TailLength = Math.round(random(20, 40)); this.#updateSlider('tailLength', ProjectData.TailLength);
        ProjectData.TailAngle = Math.round(random(-PI / 4, -PI / 12)); this.#updateSlider('tailAngle', ProjectData.TailAngle);

        // LEGS
        ProjectData.LegHeight = Math.round(random(20, 50)); this.#updateSlider('legHeight', ProjectData.LegHeight);
        ProjectData.LegSpacing = Math.round(random(ProjectData.BodyWidth * 0.4, ProjectData.BodyWidth * 0.8)); this.#updateSlider('legSpacing', ProjectData.LegSpacing);
        ProjectData.LegFingerLength = Math.round(random(10, 30)); this.#updateSlider('legFingerLength', ProjectData.LegFingerLength);
        ProjectData.LegFingerAngle = Math.round(random(PI / 6, PI / 3)); this.#updateSlider('legFingerAngle', ProjectData.LegFingerAngle);
    }

    static draw() {

        this.#drawHead();

        this.#drawBody();

        this.#drawTail();

        this.#drawLegs();
    }

    static #drawHead() {
        push();

        // HEAD
        translate(0, -(ProjectData.LegHeight + ProjectData.BodyHeight / 2 + this.#platformHeight), 0);
        translate(0, -(ProjectData.HeadHeight + ProjectData.BodyHeight) / 2, ProjectData.BodyLength * 0.4);
        fill(ProjectData.BodyColor);
        strokeWeight(0.5);

        box(ProjectData.HeadWidth, ProjectData.HeadHeight, ProjectData.HeadLength);

        // BEAK
        push();
        translate(0, ProjectData.HeadHeight / 2 - 5, (ProjectData.HeadLength + ProjectData.BeakLength) / 2);
        fill(ProjectData.BeakColor);
        box(ProjectData.BeakWidth, ProjectData.BeakHeight, ProjectData.BeakLength);
        pop();


        // EYES
        fill(0);
        // LEFT
        translate(-ProjectData.HeadWidth / 2, -ProjectData.HeadHeight / 2 + 10, ProjectData.HeadLength / 2 - 10);
        box(5);
        // RIGHT
        translate(ProjectData.HeadWidth, 0, 0);
        box(5);

        pop();
    }

    static #drawBody() {

        push();

        // BODY
        translate(0, -(ProjectData.LegHeight + ProjectData.BodyHeight / 2 + this.#platformHeight), 0);
        fill(ProjectData.BodyColor);
        strokeWeight(0.5);

        box(ProjectData.BodyWidth, ProjectData.BodyHeight, ProjectData.BodyLength);

        // WINGS
        fill(ProjectData.BodyColor);
        // LEFT
        translate(-ProjectData.BodyWidth / 2, (ProjectData.WingHeight - ProjectData.BodyHeight) * 0.5 + 5, ProjectData.BodyLength * 0.3 - ProjectData.WingLength / 2);
        box(ProjectData.WingWidth, ProjectData.WingHeight, ProjectData.WingLength);
        // RIGHT
        translate(ProjectData.BodyWidth, 0, 0);
        box(ProjectData.WingWidth, ProjectData.WingHeight, ProjectData.WingLength);

        pop();
    }

    static #drawTail() {
        push();
        strokeWeight(0.5);

        // Translate at body height
        translate(0, -(ProjectData.LegHeight + ProjectData.BodyHeight - ProjectData.TailHeight / 2 + this.#platformHeight), 0);
        // Translate at body end
        translate(0, 0, -(ProjectData.BodyLength + ProjectData.TailLength) / 2);
        // Translate for start tail rotation
        translate(0, ProjectData.TailLength / 3, ProjectData.TailLength);

        // Rotate around tail start
        rotateX(ProjectData.TailAngle);

        // // Rever rotation translation
        translate(0, 0, -ProjectData.TailLength);


        fill(ProjectData.BodyColor);
        strokeWeight(0.3);

        box(ProjectData.TailWidth, ProjectData.TailHeight, ProjectData.TailLength);

        pop();
    }

    static #drawLegs() {
        push();
        translate(0, -(this.#platformHeight + ProjectData.LegHeight / 2) - 1, 0);

        // translate(0, -(10 + this.#legsHeight / 2) - 1, -20);
        noStroke();
        fill(ProjectData.LegColor);

        translate(-ProjectData.LegSpacing / 2, 0, 0);
        this.#drawLeg();

        translate(ProjectData.LegSpacing, 0, 0);
        this.#drawLeg();

        pop();
    }

    static #drawLeg() {

        const halfLegsHeight = ProjectData.LegHeight / 2;

        cylinder(this.#legRadius, ProjectData.LegHeight, 10, 1);

        const leftFinger = Tools.rotatePoint(0, ProjectData.LegFingerLength, ProjectData.LegFingerAngle);
        const rightFinger = Tools.rotatePoint(0, ProjectData.LegFingerLength, -ProjectData.LegFingerAngle);
        fill(ProjectData.LegColor);

        push();
        beginShape(LINES);
        vertex(-this.#legRadius, halfLegsHeight, 0);

        // LEFT FINGER
        vertex(leftFinger.x, halfLegsHeight, leftFinger.y);

        // CENTER FINGER
        quadraticVertex(leftFinger.x / 2, halfLegsHeight, ProjectData.LegFingerLength * 0.3, 0, halfLegsHeight, ProjectData.LegFingerLength);

        // RIGHT FINGER
        quadraticVertex(rightFinger.x / 2, halfLegsHeight, ProjectData.LegFingerLength * 0.3, rightFinger.x, halfLegsHeight, rightFinger.y)

        vertex(this.#legRadius, halfLegsHeight, 0);
        vertex(-this.#legRadius, halfLegsHeight, 0);
        endShape(CLOSE);

        strokeWeight(2);
        stroke(ProjectData.LegFingerColor);
        line(0, halfLegsHeight, 0, leftFinger.x, halfLegsHeight, leftFinger.y)
        line(0, halfLegsHeight, 0, 0, halfLegsHeight, ProjectData.LegFingerLength)
        line(0, halfLegsHeight, 0, rightFinger.x, halfLegsHeight, rightFinger.y)

        pop();
    }
}