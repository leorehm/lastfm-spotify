
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const token = readable(null, function start(set) {
      const hashParams = {};
      const r = /([^&;=]+)=?([^&;]*)/g;
      const q = window.location.hash.substring(1);
      let e;
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      const access_token = hashParams.access_token;
      set(access_token);

      window.history.pushState("object or string", "Title", "/");

    });

    const appUrl = readable(null, function start(set) {
      // set("https://leorehm.github.io/lastfm-spotify");
      set("http://localhost:8080/");
    });

    const timeRange = writable('medium_term');

    const tokenExpired = writable(false);

    const trackdata = writable(null);

    /* src\components\LfmForm.svelte generated by Svelte v3.46.4 */

    const { console: console_1$1 } = globals;
    const file$3 = "src\\components\\LfmForm.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (53:3) {#each period as period}
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*period*/ ctx[6] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*period*/ ctx[6];
    			option.value = option.__value;
    			add_location(option, file$3, 53, 4, 1721);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(53:3) {#each period as period}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div4;
    	let form;
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let br0;
    	let t2;
    	let div1;
    	let label1;
    	let t4;
    	let input1;
    	let br1;
    	let t5;
    	let div2;
    	let label2;
    	let t7;
    	let select;
    	let br2;
    	let t8;
    	let button0;
    	let t9;
    	let button0_disbaled_value;
    	let t10;
    	let div3;
    	let textarea;
    	let t11;
    	let button1;
    	let t12;
    	let button1_disabled_value;
    	let mounted;
    	let dispose;
    	let each_value = /*period*/ ctx[6];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			form = element("form");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "last.fm username";
    			t1 = space();
    			input0 = element("input");
    			br0 = element("br");
    			t2 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "track limit";
    			t4 = space();
    			input1 = element("input");
    			br1 = element("br");
    			t5 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "time period";
    			t7 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			br2 = element("br");
    			t8 = space();
    			button0 = element("button");
    			t9 = text("Get Data");
    			t10 = space();
    			div3 = element("div");
    			textarea = element("textarea");
    			t11 = space();
    			button1 = element("button");
    			t12 = text("Next");
    			attr_dev(label0, "class", "form-label svelte-et0bzl");
    			attr_dev(label0, "for", "username");
    			add_location(label0, file$3, 42, 2, 1231);
    			attr_dev(input0, "class", "form-input svelte-et0bzl");
    			attr_dev(input0, "name", "username");
    			attr_dev(input0, "type", "text");
    			add_location(input0, file$3, 43, 2, 1299);
    			add_location(br0, file$3, 43, 76, 1373);
    			add_location(div0, file$3, 41, 1, 1223);
    			attr_dev(label1, "class", "form-label svelte-et0bzl");
    			attr_dev(label1, "for", "limit");
    			add_location(label1, file$3, 46, 2, 1395);
    			attr_dev(input1, "class", "form-input svelte-et0bzl");
    			attr_dev(input1, "name", "limit");
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "1");
    			attr_dev(input1, "max", "100");
    			add_location(input1, file$3, 47, 2, 1455);
    			add_location(br1, file$3, 47, 86, 1539);
    			add_location(div1, file$3, 45, 1, 1387);
    			attr_dev(label2, "class", "form-label svelte-et0bzl");
    			attr_dev(label2, "for", "period");
    			add_location(label2, file$3, 50, 1, 1560);
    			attr_dev(select, "class", "form-input svelte-et0bzl");
    			attr_dev(select, "name", "period");
    			if (/*chosenPeriod*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[9].call(select));
    			add_location(select, file$3, 51, 2, 1621);
    			add_location(br2, file$3, 55, 11, 1769);
    			add_location(div2, file$3, 49, 1, 1553);
    			attr_dev(button0, "id", "submit-button");
    			attr_dev(button0, "disbaled", button0_disbaled_value = /*username*/ ctx[0] = "");
    			attr_dev(button0, "class", "svelte-et0bzl");
    			add_location(button0, file$3, 57, 2, 1784);
    			attr_dev(form, "class", "item-form svelte-et0bzl");
    			add_location(form, file$3, 40, 1, 1161);
    			textarea.readOnly = true;
    			attr_dev(textarea, "id", "song-output");
    			attr_dev(textarea, "rows", "limit");
    			attr_dev(textarea, "cols", "50");
    			attr_dev(textarea, "class", "svelte-et0bzl");
    			add_location(textarea, file$3, 61, 2, 1919);
    			attr_dev(div3, "class", "item-output svelte-et0bzl");
    			add_location(div3, file$3, 60, 1, 1891);
    			attr_dev(div4, "class", "container svelte-et0bzl");
    			add_location(div4, file$3, 39, 0, 1136);
    			attr_dev(button1, "id", "next-button");
    			button1.disabled = button1_disabled_value = /*output*/ ctx[3] == "";
    			attr_dev(button1, "class", "svelte-et0bzl");
    			add_location(button1, file$3, 64, 0, 2021);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, form);
    			append_dev(form, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			set_input_value(input0, /*username*/ ctx[0]);
    			append_dev(div0, br0);
    			append_dev(form, t2);
    			append_dev(form, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			set_input_value(input1, /*limit*/ ctx[2]);
    			append_dev(div1, br1);
    			append_dev(form, t5);
    			append_dev(form, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t7);
    			append_dev(div2, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*chosenPeriod*/ ctx[1]);
    			append_dev(div2, br2);
    			append_dev(form, t8);
    			append_dev(form, button0);
    			append_dev(button0, t9);
    			append_dev(div4, t10);
    			append_dev(div4, div3);
    			append_dev(div3, textarea);
    			set_input_value(textarea, /*output*/ ctx[3]);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, button1, anchor);
    			append_dev(button1, t12);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[9]),
    					listen_dev(button0, "click", /*onSubmit*/ ctx[4], { once: true }, false, false),
    					listen_dev(form, "submit", prevent_default(/*onSubmit*/ ctx[4]), false, true, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[10]),
    					listen_dev(button1, "click", /*onNext*/ ctx[5], { once: true }, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*username*/ 1 && input0.value !== /*username*/ ctx[0]) {
    				set_input_value(input0, /*username*/ ctx[0]);
    			}

    			if (dirty & /*limit*/ 4 && to_number(input1.value) !== /*limit*/ ctx[2]) {
    				set_input_value(input1, /*limit*/ ctx[2]);
    			}

    			if (dirty & /*period*/ 64) {
    				each_value = /*period*/ ctx[6];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*chosenPeriod, period*/ 66) {
    				select_option(select, /*chosenPeriod*/ ctx[1]);
    			}

    			if (dirty & /*username*/ 1 && button0_disbaled_value !== (button0_disbaled_value = /*username*/ ctx[0] = "")) {
    				attr_dev(button0, "disbaled", button0_disbaled_value);
    			}

    			if (dirty & /*output*/ 8) {
    				set_input_value(textarea, /*output*/ ctx[3]);
    			}

    			if (dirty & /*output*/ 8 && button1_disabled_value !== (button1_disabled_value = /*output*/ ctx[3] == "")) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const apiKey = "57411198178c595fbb09fabbe83934ac";

    function instance$3($$self, $$props, $$invalidate) {
    	let $trackdata;
    	validate_store(trackdata, 'trackdata');
    	component_subscribe($$self, trackdata, $$value => $$invalidate(12, $trackdata = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LfmForm', slots, []);
    	let username = "";
    	const period = ["overall", "7day", "1month", "3month", "6month", "12month"];
    	let chosenPeriod = "7day";
    	let limit = 20;
    	let __trackdata;
    	let output = "";

    	async function onSubmit() {
    		await fetchLfmData();
    		if (output != "") $$invalidate(3, output = "");

    		for (let i = 0; i < __trackdata.length; i++) {
    			$$invalidate(3, output += i + 1 + ": ");
    			$$invalidate(3, output += __trackdata[i].artist.name + " - ");
    			$$invalidate(3, output += __trackdata[i].name + "\r\n");
    		}
    	}

    	function onNext() {
    		set_store_value(trackdata, $trackdata = __trackdata, $trackdata);
    	}

    	// TODO: input username, period, limit and api key as parameter with URLSeachParams()
    	async function fetchLfmData() {
    		console.log("fetching last.fm data...");
    		const url = "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + username + "&period=" + chosenPeriod + "&limit=" + limit + "&api_key=" + apiKey + "&format=json";

    		await fetch(url).then(response => response.json()).then(data => {
    			__trackdata = data.toptracks.track;
    			console.log("...done!");
    		});
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<LfmForm> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		username = this.value;
    		$$invalidate(0, username);
    	}

    	function input1_input_handler() {
    		limit = to_number(this.value);
    		$$invalidate(2, limit);
    	}

    	function select_change_handler() {
    		chosenPeriod = select_value(this);
    		$$invalidate(1, chosenPeriod);
    		$$invalidate(6, period);
    	}

    	function textarea_input_handler() {
    		output = this.value;
    		$$invalidate(3, output);
    	}

    	$$self.$capture_state = () => ({
    		timeRange,
    		token,
    		tokenExpired,
    		trackdata,
    		username,
    		period,
    		chosenPeriod,
    		limit,
    		apiKey,
    		__trackdata,
    		output,
    		onSubmit,
    		onNext,
    		fetchLfmData,
    		$trackdata
    	});

    	$$self.$inject_state = $$props => {
    		if ('username' in $$props) $$invalidate(0, username = $$props.username);
    		if ('chosenPeriod' in $$props) $$invalidate(1, chosenPeriod = $$props.chosenPeriod);
    		if ('limit' in $$props) $$invalidate(2, limit = $$props.limit);
    		if ('__trackdata' in $$props) __trackdata = $$props.__trackdata;
    		if ('output' in $$props) $$invalidate(3, output = $$props.output);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		username,
    		chosenPeriod,
    		limit,
    		output,
    		onSubmit,
    		onNext,
    		period,
    		input0_input_handler,
    		input1_input_handler,
    		select_change_handler,
    		textarea_input_handler
    	];
    }

    class LfmForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LfmForm",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\SpotifyLogin.svelte generated by Svelte v3.46.4 */
    const file$2 = "src\\components\\SpotifyLogin.svelte";

    // (32:0) {#if !$token}
    function create_if_block_1$1(ctx) {
    	let div1;
    	let a;
    	let button;
    	let t1;
    	let br;
    	let t2;
    	let div0;
    	let label;
    	let t4;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			a = element("a");
    			button = element("button");
    			button.textContent = "Connect to Spotify";
    			t1 = space();
    			br = element("br");
    			t2 = space();
    			div0 = element("div");
    			label = element("label");
    			label.textContent = "Remember me?";
    			t4 = space();
    			input = element("input");
    			attr_dev(button, "class", "login-btn svelte-181gumj");
    			add_location(button, file$2, 34, 6, 1078);
    			attr_dev(a, "href", /*loginLink*/ ctx[2]);
    			add_location(a, file$2, 33, 4, 1050);
    			add_location(br, file$2, 36, 4, 1147);
    			attr_dev(label, "id", "checkbox-text");
    			attr_dev(label, "for", "remember-me");
    			attr_dev(label, "class", "svelte-181gumj");
    			add_location(label, file$2, 38, 6, 1196);
    			attr_dev(input, "id", "checkbox-box");
    			attr_dev(input, "name", "remember-me");
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "class", "svelte-181gumj");
    			add_location(input, file$2, 39, 6, 1268);
    			attr_dev(div0, "id", "checkbox-container");
    			attr_dev(div0, "class", "svelte-181gumj");
    			add_location(div0, file$2, 37, 4, 1159);
    			attr_dev(div1, "id", "login");
    			attr_dev(div1, "class", "svelte-181gumj");
    			add_location(div1, file$2, 32, 2, 1028);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, a);
    			append_dev(a, button);
    			append_dev(div1, t1);
    			append_dev(div1, br);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(div0, t4);
    			append_dev(div0, input);
    			input.checked = /*rememberMe*/ ctx[0];

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*loginLink*/ 4) {
    				attr_dev(a, "href", /*loginLink*/ ctx[2]);
    			}

    			if (dirty & /*rememberMe*/ 1) {
    				input.checked = /*rememberMe*/ ctx[0];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(32:0) {#if !$token}",
    		ctx
    	});

    	return block;
    }

    // (50:0) {#if $tokenExpired}
    function create_if_block$1(ctx) {
    	let section;
    	let p;
    	let t1;
    	let a;
    	let button;

    	const block = {
    		c: function create() {
    			section = element("section");
    			p = element("p");
    			p.textContent = "Token expired! Please log out and log back in again.";
    			t1 = space();
    			a = element("a");
    			button = element("button");
    			button.textContent = "Logout";
    			add_location(p, file$2, 51, 4, 1492);
    			add_location(button, file$2, 53, 6, 1583);
    			attr_dev(a, "href", /*$appUrl*/ ctx[1]);
    			add_location(a, file$2, 52, 4, 1557);
    			attr_dev(section, "class", "expired-token");
    			add_location(section, file$2, 50, 2, 1455);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    			append_dev(section, t1);
    			append_dev(section, a);
    			append_dev(a, button);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$appUrl*/ 2) {
    				attr_dev(a, "href", /*$appUrl*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(50:0) {#if $tokenExpired}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t;
    	let if_block1_anchor;
    	let if_block0 = !/*$token*/ ctx[3] && create_if_block_1$1(ctx);
    	let if_block1 = /*$tokenExpired*/ ctx[4] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*$token*/ ctx[3]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*$tokenExpired*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const client_id = "e27568bbeef44f7db83b446e2d6f57ab";
    const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private";

    function generateRandomString(length) {
    	let text = "";
    	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    	for (let i = 0; i < length; i++) {
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
    	}

    	return text;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let params;
    	let loginLink;
    	let $appUrl;
    	let $token;
    	let $tokenExpired;
    	validate_store(appUrl, 'appUrl');
    	component_subscribe($$self, appUrl, $$value => $$invalidate(1, $appUrl = $$value));
    	validate_store(token, 'token');
    	component_subscribe($$self, token, $$value => $$invalidate(3, $token = $$value));
    	validate_store(tokenExpired, 'tokenExpired');
    	component_subscribe($$self, tokenExpired, $$value => $$invalidate(4, $tokenExpired = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SpotifyLogin', slots, []);
    	const url = new URL("https://accounts.spotify.com/authorize?");
    	const state = generateRandomString(16);
    	let rememberMe = true;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SpotifyLogin> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		rememberMe = this.checked;
    		$$invalidate(0, rememberMe);
    	}

    	$$self.$capture_state = () => ({
    		token,
    		tokenExpired,
    		appUrl,
    		client_id,
    		generateRandomString,
    		url,
    		scope,
    		state,
    		rememberMe,
    		params,
    		loginLink,
    		$appUrl,
    		$token,
    		$tokenExpired
    	});

    	$$self.$inject_state = $$props => {
    		if ('rememberMe' in $$props) $$invalidate(0, rememberMe = $$props.rememberMe);
    		if ('params' in $$props) $$invalidate(5, params = $$props.params);
    		if ('loginLink' in $$props) $$invalidate(2, loginLink = $$props.loginLink);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*rememberMe, $appUrl*/ 3) {
    			$$invalidate(5, params = new URLSearchParams({
    					response_type: "token",
    					show_dialog: !rememberMe, // Will show up on first sign-on regardless
    					client_id,
    					scope,
    					redirect_uri: $appUrl,
    					state
    				}));
    		}

    		if ($$self.$$.dirty & /*params*/ 32) {
    			$$invalidate(2, loginLink = url + params);
    		}
    	};

    	return [
    		rememberMe,
    		$appUrl,
    		loginLink,
    		$token,
    		$tokenExpired,
    		params,
    		input_change_handler
    	];
    }

    class SpotifyLogin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SpotifyLogin",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\CreatePlaylist.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1, console: console_1 } = globals;
    const file$1 = "src\\components\\CreatePlaylist.svelte";

    function create_fragment$1(ctx) {
    	let label0;
    	let t1;
    	let input0;
    	let br0;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let br1;
    	let t5;
    	let button;
    	let t7;
    	let p;
    	let t8;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label0 = element("label");
    			label0.textContent = "Playlist Name";
    			t1 = space();
    			input0 = element("input");
    			br0 = element("br");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Description";
    			t4 = space();
    			input1 = element("input");
    			br1 = element("br");
    			t5 = space();
    			button = element("button");
    			button.textContent = "Create Playlist";
    			t7 = space();
    			p = element("p");
    			t8 = text(/*message*/ ctx[2]);
    			attr_dev(label0, "class", "label");
    			attr_dev(label0, "for", "playlist-name");
    			add_location(label0, file$1, 129, 0, 4001);
    			attr_dev(input0, "class", "input");
    			attr_dev(input0, "name", "playlist-name");
    			attr_dev(input0, "type", "text");
    			add_location(input0, file$1, 130, 0, 4064);
    			add_location(br0, file$1, 130, 78, 4142);
    			attr_dev(label1, "class", "label");
    			attr_dev(label1, "for", "playlist-desc");
    			add_location(label1, file$1, 132, 0, 4148);
    			attr_dev(input1, "class", "input");
    			attr_dev(input1, "name", "playlist-desc");
    			attr_dev(input1, "type", "text");
    			add_location(input1, file$1, 133, 0, 4209);
    			add_location(br1, file$1, 133, 78, 4287);
    			add_location(button, file$1, 135, 0, 4293);
    			add_location(p, file$1, 137, 0, 4359);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input0, anchor);
    			set_input_value(input0, /*playlistName*/ ctx[0]);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, label1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, input1, anchor);
    			set_input_value(input1, /*playlistDesc*/ ctx[1]);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t8);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(button, "click", /*createPlaylist*/ ctx[3], { once: true }, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*playlistName*/ 1 && input0.value !== /*playlistName*/ ctx[0]) {
    				set_input_value(input0, /*playlistName*/ ctx[0]);
    			}

    			if (dirty & /*playlistDesc*/ 2 && input1.value !== /*playlistDesc*/ ctx[1]) {
    				set_input_value(input1, /*playlistDesc*/ ctx[1]);
    			}

    			if (dirty & /*message*/ 4) set_data_dev(t8, /*message*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(label1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(p);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $token;
    	let $trackdata;
    	validate_store(token, 'token');
    	component_subscribe($$self, token, $$value => $$invalidate(8, $token = $$value));
    	validate_store(trackdata, 'trackdata');
    	component_subscribe($$self, trackdata, $$value => $$invalidate(9, $trackdata = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CreatePlaylist', slots, []);
    	let playlistName = "last.fm top " + $trackdata.length;
    	let playlistDesc = "";
    	let user_id;
    	let playlistInfo;
    	let message = "";

    	async function getUser() {
    		$$invalidate(2, message = "Please wait: getting user data...");
    		const accessToken = $token;

    		await fetch('https://api.spotify.com/v1/me', {
    			method: 'GET',
    			headers: { Authorization: "Bearer " + accessToken }
    		}).then(response => response.json()).then(data => {
    			user_id = data.id;
    		});
    	}

    	async function createPlaylist() {
    		// https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
    		await getUser();

    		$$invalidate(2, message = "Please wait: Playlist is being created...");
    		console.log("creating playlist for user ", user_id);
    		const accessToken = $token;

    		const res = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
    			method: 'POST',
    			headers: { Authorization: "Bearer " + accessToken },
    			body: JSON.stringify({
    				"name": playlistName,
    				"description": playlistDesc,
    				"public": false
    			})
    		});

    		if (res.ok) {
    			playlistInfo = await res.json();
    		} else {
    			tokenExpired.set(true);
    		}

    		addToPlaylist();
    	}

    	async function getSongId(track, artist) {
    		// https://developer.spotify.com/documentation/web-api/reference/#/operations/search
    		// query could be optimized for higher accuracy
    		// console.log("searching for: ", track, " - ", artist);
    		const url = `https://api.spotify.com/v1/search?q=track:${track}%20artist:${artist}&type=track&limit=5`;

    		const accessToken = $token;
    		let id;

    		await fetch(url, {
    			method: 'GET',
    			headers: { Authorization: "Bearer " + accessToken }
    		}).then(response => {
    			if (response.ok) {
    				return response.json();
    			}

    			throw new Error("Track not found - skipping");
    		}).then(data => {
    			// console.log(data);
    			console.log("track_id found: ", data.tracks.items[0].uri);

    			id = data.tracks.items[0].uri;
    		}).catch(error => {
    			console.log(error);
    		});

    		return id;
    	}

    	async function addToPlaylist() {
    		// https://developer.spotify.com/documentation/web-api/reference/#/operations/add-tracks-to-playlist
    		$$invalidate(2, message = "Please wait: Getting songs...");

    		// get all song ids
    		const ids = [];

    		for (let i = 0; i < $trackdata.length; i++) {
    			ids.push(await getSongId($trackdata[i].name, $trackdata[i].artist.name));
    		}

    		// console.log("finished getting track ids:", ids);
    		// add songs to playlist
    		$$invalidate(2, message = "Please wait: Adding songs to playlist...");

    		const accessToken = $token;
    		const url = `https://api.spotify.com/v1/playlists/${playlistInfo.id}/tracks`;

    		await fetch(url, {
    			method: 'POST',
    			headers: { Authorization: "Bearer " + accessToken },
    			body: JSON.stringify({ uris: ids })
    		}).then(response => {
    			if (response.ok) {
    				return response.json();
    			}

    			throw new Error("Adding to playlist not successful");
    		}).then(data => {
    			console.log('add to playlist RESPONSE: ', data);
    		}).catch(error => {
    			console.log(error);
    			$$invalidate(2, message = "Oh no, something went wrong!");
    		});

    		$$invalidate(2, message = "Success!");
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<CreatePlaylist> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		playlistName = this.value;
    		$$invalidate(0, playlistName);
    	}

    	function input1_input_handler() {
    		playlistDesc = this.value;
    		$$invalidate(1, playlistDesc);
    	}

    	$$self.$capture_state = () => ({
    		token,
    		timeRange,
    		tokenExpired,
    		trackdata,
    		playlistName,
    		playlistDesc,
    		user_id,
    		playlistInfo,
    		message,
    		getUser,
    		createPlaylist,
    		getSongId,
    		addToPlaylist,
    		$token,
    		$trackdata
    	});

    	$$self.$inject_state = $$props => {
    		if ('playlistName' in $$props) $$invalidate(0, playlistName = $$props.playlistName);
    		if ('playlistDesc' in $$props) $$invalidate(1, playlistDesc = $$props.playlistDesc);
    		if ('user_id' in $$props) user_id = $$props.user_id;
    		if ('playlistInfo' in $$props) playlistInfo = $$props.playlistInfo;
    		if ('message' in $$props) $$invalidate(2, message = $$props.message);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		playlistName,
    		playlistDesc,
    		message,
    		createPlaylist,
    		input0_input_handler,
    		input1_input_handler
    	];
    }

    class CreatePlaylist extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreatePlaylist",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */
    const file = "src\\App.svelte";

    // (15:32) 
    function create_if_block_2(ctx) {
    	let createplaylist;
    	let current;
    	createplaylist = new CreatePlaylist({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(createplaylist.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(createplaylist, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(createplaylist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(createplaylist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(createplaylist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(15:32) ",
    		ctx
    	});

    	return block;
    }

    // (13:22) 
    function create_if_block_1(ctx) {
    	let lfmform;
    	let current;
    	lfmform = new LfmForm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(lfmform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(lfmform, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lfmform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lfmform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(lfmform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(13:22) ",
    		ctx
    	});

    	return block;
    }

    // (11:0) {#if !$token || $tokenExpired}
    function create_if_block(ctx) {
    	let spotifylogin;
    	let current;
    	spotifylogin = new SpotifyLogin({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(spotifylogin.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(spotifylogin, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spotifylogin.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spotifylogin.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(spotifylogin, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(11:0) {#if !$token || $tokenExpired}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let h2;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*$token*/ ctx[0] || /*$tokenExpired*/ ctx[1]) return 0;
    		if (!/*$trackdata*/ ctx[2]) return 1;
    		if (/*$token*/ ctx[0] && /*$trackdata*/ ctx[2]) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "last.fm to spotify playlist";
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			set_style(h2, "text-align", "center");
    			add_location(h2, file, 7, 0, 273);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $token;
    	let $tokenExpired;
    	let $trackdata;
    	validate_store(token, 'token');
    	component_subscribe($$self, token, $$value => $$invalidate(0, $token = $$value));
    	validate_store(tokenExpired, 'tokenExpired');
    	component_subscribe($$self, tokenExpired, $$value => $$invalidate(1, $tokenExpired = $$value));
    	validate_store(trackdata, 'trackdata');
    	component_subscribe($$self, trackdata, $$value => $$invalidate(2, $trackdata = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		LfmForm,
    		SpotifyLogin,
    		CreatePlaylist,
    		timeRange,
    		token,
    		tokenExpired,
    		trackdata,
    		$token,
    		$tokenExpired,
    		$trackdata
    	});

    	return [$token, $tokenExpired, $trackdata];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
