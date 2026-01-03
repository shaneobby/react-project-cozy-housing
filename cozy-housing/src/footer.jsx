import './Footer.css';

function Footer() {
  return (
    <footer>
      <div>
        <div>
          <h4>Cozy Housing</h4>
          <p>
            Are goal is your comfort 
          </p>
        </div>

        <div>
            <h4>Links</h4>
            <ul>
                <li><a href="#" >About Us</a></li>
                <li><a href="#" >Privacy Policy</a></li>
            </ul>
        </div>

        <div>
            <h4>Find us at</h4>
            <div>
                <a href="#"><i class="fa">&#xf082;</i> Facebook</a>
                <a href="#"><i class="fa">&#xf16d;</i> Instagram</a>
                <a href="#"><i class="fa">&#xf003;</i> Email</a>
            </div>
            <p>
                &copy;2006 Cozy Housing. All rights reserved.
            </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;